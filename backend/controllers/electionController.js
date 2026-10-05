import store from '../db/store.js';

export const getAllElections = async (req, res, next) => {
  try {
    const elections = await store.getAllElections(req.query);
    res.status(200).json(elections);
  } catch (error) {
    next(error);
  }
};

export const getElectionById = async (req, res, next) => {
  try {
    const election = await store.getElectionById(req.params.id);
    if (!election) {
      return res.status(404).json({
        success: false,
        message: 'Election not found'
      });
    }
    res.status(200).json(election);
  } catch (error) {
    next(error);
  }
};

export const createElection = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Election name is required.'
      });
    }
    const newElection = await store.createElection(req.body);
    res.status(201).json(newElection);
  } catch (error) {
    next(error);
  }
};

export const updateElection = async (req, res, next) => {
  try {
    const updated = await store.updateElection(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Election not found'
      });
    }
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteElection = async (req, res, next) => {
  try {
    const success = await store.deleteElection(req.params.id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Election not found'
      });
    }
    res.status(200).json({ success: true, message: 'Election deleted' });
  } catch (error) {
    next(error);
  }
};

export const getElectionPositions = async (req, res, next) => {
  try {
    const positions = await store.getPositionsByElection(req.params.id);
    res.status(200).json(positions);
  } catch (error) {
    next(error);
  }
};
