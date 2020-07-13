import * as mongoose from 'mongoose';

export const JavascriptInjectionSchema = new mongoose.Schema({
  type: {type: String, required:true},
  value: {type: String, required:true}
});

export interface JavascriptInjectionModel extends mongoose.Document {
  type: string,
  value: string
}

export const GenericModificationSchema = new mongoose.Schema({
  type: {type: String, required:true},
  selector: {type: String, required:true},
  value: {type: String, required:false}
});

export interface GenericModificationModel extends mongoose.Document {
  type: string,
  selector:string,
  value: string
}

export const ResizeModificationSchema = new mongoose.Schema({
  type: {type: String, required:true},
  selector: {type: String, required:true},
  value: {
    width: {type: String},
    height: {type: String}
  }
});

export interface ResizeModificationModel extends mongoose.Document {
  type: string,
  selector:string,
  value: {
    width: string,
    height: string
  }
}

export const DesignSchema = new mongoose.Schema({
  email: {type: String, required: true},
  name: {type:String, required: true},
  timestamp: {type:String, required: true},
  active: {type: Boolean, required:true},
  javascriptInjections: {type: [JavascriptInjectionSchema], required:false},
  genericModifications: {type: [GenericModificationSchema], required:false},
  resizeModifications: {type: [ResizeModificationSchema], required:false}
});

export interface DesignCrudModel extends mongoose.Document {
  email: string,
  name: string,
  timestamp:string,
  active: boolean,
  javascriptInjections: [JavascriptInjectionModel],
  genericModifications: [GenericModificationModel],
  resizeModifications: [ResizeModificationModel]
}
