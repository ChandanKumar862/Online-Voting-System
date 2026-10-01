import { findAllElections } from "../models/findAllElection.model.js";
import supabase from "../config/supabase.js"

export const getAllElections = async (req, res) => {

    try {

        const { data, error } = await findAllElections();

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


