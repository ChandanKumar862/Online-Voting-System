import store from '../db/store.js';

export const getAllPositions = async (req, res, next) => {
  try {
    const list = await store.getAllPositions();
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getPositionById = async (req, res, next) => {
  try {
    const position = await store.getPositionById(req.params.id);
    if (!position) {
      return res.status(404).json({
        success: false,
        message: 'Position not found'
      });
    }
    res.status(200).json(position);
  } catch (error) {
    next(error);
  }
};

export const createPosition = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Position name is required.'
      });
    }
    const created = await store.createPosition(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updatePosition = async (req, res, next) => {
  try {
    const updated = await store.updatePosition(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Position not found'
      });
    }
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deletePosition = async (req, res, next) => {
  try {
    const success = await store.deletePosition(req.params.id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Position not found'
      });
    }
    res.status(200).json({ success: true, message: 'Position deleted successfully' });
  } catch (error) {
    next(error);
  }
};
