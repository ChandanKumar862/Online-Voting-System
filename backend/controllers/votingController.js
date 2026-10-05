import store from '../db/store.js';

export const submitVote = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required to submit a vote. Anonymous or unauthenticated voting is prohibited.'
      });
    }

    const { electionId, candidateId, positionId, constituencyId } = req.body;
    const voterId = req.user.id;

    if (!electionId || !candidateId) {
      return res.status(400).json({
        success: false,
        message: 'Election ID and Candidate ID are required to cast a vote.'
      });
    }

    const voteResult = await store.submitVote({
      voterId,
      electionId,
      candidateId,
      positionId,
      constituencyId
    });

    res.status(201).json(voteResult);
  } catch (error) {
    if (error.statusCode === 400 || error.statusCode === 403 || error.statusCode === 404) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

export const getVoteStatus = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const { electionId } = req.params;
    const voterId = req.user.id;

    const status = await store.getVoteStatus(voterId, electionId);
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};

export const getVoteHistory = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const voterId = req.user.id;
    const history = await store.getVoteHistory(voterId);
    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};
