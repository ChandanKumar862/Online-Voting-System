import store from '../db/store.js';

export const getElectionResults = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const results = await store.getElectionResults(electionId);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const getWinner = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const winner = await store.getWinner(electionId);
    res.status(200).json(winner);
  } catch (error) {
    next(error);
  }
};
