const { Text, Select, Relationship } = require('@keystonejs/fields')
const keystone = require('keystone');

const recipeImgStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
       // required; path where the files should be stored
      path: keystone.expandPath('server/public/img'),
      generateFilename: function (file, index) {
        return file.originalname;
      },
      whenExists: 'error',
       // path where files will be served
      publicPath: '/public/img',
    },
  });

const postFields = {
    fields : {
        title:{
            type: Text,
            isRequired: true
        },
        body:{
            type: Text,
            isMultiline: true
        },
        status:{
            type: Select,
            options:[
                {value: "PUBLISHED", label: "Published"},
                {value: "UNPUBLISHED", label: "Unublished"}
            ],
            defaultValue: "PUBLISHED"
        },
        age:{
            type:Text
        },
        author:{
            type: Relationship,
            ref: 'User',
            many: false,
            isRequired: true
        }
    }
}

module.exports = postFields