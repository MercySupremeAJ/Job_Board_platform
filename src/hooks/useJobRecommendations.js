// ============================================================
// AfriHire — useJobRecommendations Hook
// ★ BONUS: Skill-based job recommendation engine
// ============================================================

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllJobs } from '../store/jobsSlice';
import { selectUser } from '../store/authSlice';
import { calculateSkillMatch, getMatchingSkills } from '../utils/helpers';

/**
 * Recommends jobs based on candidate's skill profile
 * Uses a scoring algorithm that considers:
 * 1. Skill match percentage (primary weight)
 * 2. Number of matching skills (secondary)
 * 3. Job recency (tiebreaker boost)
 */
export const useJobRecommendations = (maxResults = 6) => {
  const user = useSelector(selectUser);
  const allJobs = useSelector(selectAllJobs);

  const recommendations = useMemo(() => {
    if (!user || !user.skills || user.skills.length === 0) {
      // If no skills, return featured jobs as fallback
      return allJobs
        .filter((job) => job.featured)
        .slice(0, maxResults)
        .map((job) => ({
          ...job,
          matchPercentage: 0,
          matchingSkills: [],
          isDefault: true,
        }));
    }

    // Score each job
    const scored = allJobs.map((job) => {
      const matchPercentage = calculateSkillMatch(user.skills, job.skills);
      const matchingSkills = getMatchingSkills(user.skills, job.skills);
      
      // Recency boost: jobs posted in last 7 days get a small boost
      const daysSincePosted = (Date.now() - new Date(job.postedAt).getTime()) / (1000 * 60 * 60 * 24);
      const recencyBoost = daysSincePosted <= 7 ? 5 : 0;
      
      // Combined score
      const score = matchPercentage + (matchingSkills.length * 2) + recencyBoost;

      return {
        ...job,
        matchPercentage,
        matchingSkills,
        score,
        isDefault: false,
      };
    });

    // Sort by score and filter out zero-match jobs (unless we'd have too few results)
    const withMatches = scored.filter((j) => j.matchPercentage > 0);
    const sorted = withMatches.sort((a, b) => b.score - a.score);

    // If not enough matches, supplement with featured jobs
    if (sorted.length < maxResults) {
      const featuredFallback = scored
        .filter((j) => j.featured && j.matchPercentage === 0)
        .slice(0, maxResults - sorted.length);
      return [...sorted, ...featuredFallback].slice(0, maxResults);
    }

    return sorted.slice(0, maxResults);
  }, [user, allJobs, maxResults]);

  return {
    recommendations,
    hasSkillProfile: user?.skills?.length > 0,
    totalMatches: recommendations.filter((r) => r.matchPercentage > 0).length,
  };
};
