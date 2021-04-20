const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: { type: String, es_boost: 2.0, maxlength: 250 },
    image: { type: String, maxlength: 250 },
    brand: { type: String, maxlength: 50 },
    price: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    }
  }
);

productSchema.index({
  name: "text",
  brand: "text",
});

// productSchema.plugin(mongoosastic, {hydrate:true, hydrateOptions: {lean: true}});

const ProductModel = mongoose.model("product", productSchema);

// ProductModel.createMapping(function(err, mapping){
//   if(err){
//     console.log('error creating mapping);
//     console.log(err);
//   }else{
//     console.log('mapping created!');
//     console.log(mapping);
//   }
// });

module.exports = { ProductModel };
