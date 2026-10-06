import store from '../db/store.js';

export const getAllConstituencies = async (req, res, next) => {
  try {
    const list = await store.getAllConstituencies();
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getConstituencyById = async (req, res, next) => {
  try {
    const constituency = await store.getConstituencyById(req.params.id);
    if (!constituency) {
      return res.status(404).json({
        success: false,
        message: 'Constituency not found'
      });
    }
    res.status(200).json(constituency);
  } catch (error) {
    next(error);
  }
};

export const createConstituency = async (req, res, next) => {
  try {
    const { name, stateId, state_id } = req.body;
    if (!name || (!stateId && !state_id)) {
      return res.status(400).json({
        success: false,
        message: 'Name and state ID are required.'
      });
    }
    const created = await store.createConstituency(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateConstituency = async (req, res, next) => {
  try {
    const updated = await store.updateConstituency(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Constituency not found'
      });
    }
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteConstituency = async (req, res, next) => {
  try {
    const success = await store.deleteConstituency(req.params.id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Constituency not found'
      });
    }
    res.status(200).json({ success: true, message: 'Constituency deleted successfully' });
  } catch (error) {
    next(error);
  }
};
