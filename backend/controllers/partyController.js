import store from '../db/store.js';

export const getAllParties = async (req, res, next) => {
  try {
    const list = await store.getAllParties();
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getPartyById = async (req, res, next) => {
  try {
    const party = await store.getPartyById(req.params.id);
    if (!party) {
      return res.status(404).json({
        success: false,
        message: 'Party not found'
      });
    }
    res.status(200).json(party);
  } catch (error) {
    next(error);
  }
};

export const createParty = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Party name is required.'
      });
    }
    const created = await store.createParty(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateParty = async (req, res, next) => {
  try {
    const updated = await store.updateParty(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Party not found'
      });
    }
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteParty = async (req, res, next) => {
  try {
    const success = await store.deleteParty(req.params.id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Party not found'
      });
    }
    res.status(200).json({ success: true, message: 'Party deleted successfully' });
  } catch (error) {
    next(error);
  }
};
