import store from '../db/store.js';

export const getAllCandidates = async (req, res, next) => {
  try {
    const list = await store.getAllCandidates(req.query);
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getCandidateById = async (req, res, next) => {
  try {
    const candidate = await store.getCandidateById(req.params.id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    res.status(200).json(candidate);
  } catch (error) {
    next(error);
  }
};

export const getCandidatesByElection = async (req, res, next) => {
  try {
    const list = await store.getAllCandidates({ electionId: req.params.electionId });
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getCandidatesByConstituency = async (req, res, next) => {
  try {
    const list = await store.getAllCandidates({ constituencyId: req.params.constituencyId });
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const createCandidate = async (req, res, next) => {
  try {
    const created = await store.createCandidate(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateCandidate = async (req, res, next) => {
  try {
    const updated = await store.updateCandidate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteCandidate = async (req, res, next) => {
  try {
    const success = await store.deleteCandidate(req.params.id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    res.status(200).json({ success: true, message: 'Candidate deleted successfully' });
  } catch (error) {
    next(error);
  }
};
