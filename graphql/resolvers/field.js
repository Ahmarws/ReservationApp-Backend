const Field = require("../../models/field");

const fieldResolver = {
  // ----- QUERIES -----
 
  fields: async () => {
    return await Field.find();
  },

  // ----- MUTATIONS -----
 
  createField: async (args,req) => {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
      
    }
    const field = new Field({
      fieldName: args.fieldInput.fieldName,
      subFields: args.fieldInput.subFields,
      timeRanges: args.fieldInput.timeRanges,
    });

    await field.save();
    return field;
  },

  updateField: async (args,req) => {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
      
    }
    const { id, fieldInput } = args;

    const updatedField = await Field.findByIdAndUpdate(
      id,
      {
        fieldName: fieldInput.fieldName,
        subFields: fieldInput.subFields,
        timeRanges: fieldInput.timeRanges,
      },
      { new: true }
    );

    return updatedField;
  },

  deleteField: async (args,req) => {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
      
    }
    const { id } = args;
    await Field.findByIdAndDelete(id);
    return true;
  },
};

module.exports = fieldResolver;



