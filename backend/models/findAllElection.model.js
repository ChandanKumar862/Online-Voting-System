import supabase from "../config/supabase.js"

export const findAllElections = async () => {

    const { data, error } = await supabase
        .from("elections")
        .select("*");

    return { data, error };
};