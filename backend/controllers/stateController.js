import store from '../db/store.js';

export const getAllStates = async (req, res, next) => {
  try {
    const states = await store.getAllStates();
    res.status(200).json(states);
  } catch (error) {
    next(error);
  }
};

export const getStateById = async (req, res, next) => {
  try {
    const state = await store.getStateById(req.params.id);
    if (!state) {
      return res.status(404).json({
        success: false,
        message: 'State not found'
      });
    }
    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

export const getConstituenciesByState = async (req, res, next) => {
  try {
    const constituencies = await store.getConstituenciesByState(req.params.id);
    res.status(200).json(constituencies);
  } catch (error) {
    next(error);
  }
};

export const createState = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'State name is required.'
      });
    }
    const newState = await store.createState(req.body);
    res.status(201).json(newState);
  } catch (error) {
    next(error);
  }
};

export const updateState = async (req, res, next) => {
  try {
    const updated = await store.updateState(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'State not found'
      });
    }
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteState = async (req, res, next) => {
  try {
    const success = await store.deleteState(req.params.id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'State not found'
      });
    }
    res.status(200).json({ success: true, message: 'State deleted successfully' });
  } catch (error) {
    next(error);
  }
};
