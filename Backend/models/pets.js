import mongoose from "mongoose";

const PetSchema = mongoose.Schema({
    petName: { type: String, required: true  },
    picture: { type: String, required: true  },
    breed: { type: String, required: true},
    birthDate: { type:  String, required: true} ,  
    gender: { type:  String, required: true} ,  
    color: { type:  String, required: true} ,  
    size: { type:  String, required: true} ,  
    location: { type: String, required: true },
    postedAT: { type: Date, default: Date.now },
    owner: { type: String },
    appliedBy: [
        {
          userid: { type: String }, chatEnabled:{ type: String, default: false}
        },
      ]
})

export const Pets = mongoose.model("Pets",PetSchema)
