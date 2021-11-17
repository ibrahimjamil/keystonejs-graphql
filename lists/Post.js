const { Text, Select, Relationship, File } = require('@keystonejs/fields')
const { LocalFileAdapter } = require('@keystonejs/file-adapters');

const fileAdapter = new LocalFileAdapter({
    src: 'post/uploads',
    path: '/post/uploads',
    getFilename: ((options) => options.originalFilename) 
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
        image: {
            type: File,
            adapter:fileAdapter,
            mimetype: '.jpeg, .jpg, .gif, .svg',
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