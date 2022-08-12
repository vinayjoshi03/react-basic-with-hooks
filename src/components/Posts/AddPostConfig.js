import validateFields from "../../util/validationCommon";
const addPostConfig = {
    postTitle: {
        id: "postTitle",
        label: "Title",
        variant: "outlined",
        autoComplete: "off",
        helperText: 'Please enter post title',
        error: false,
        name: 'postTitle',
        type: 'Text',
        color: '#42a5f5',
        required: true,
        label: 'Post Title',
        fieldValidationLabel: 'Post Title',
        validate: [
                {type:'Required',message:'Post title is required field'},
                {type: 'Text', message:'Please enter alphabets and numbers only'}, 
                
        ]
    },
    postCategory: {
        disablePortal: true,
        id: "postCategory",
        inputId: "postCategory",
        required: true,
        label: 'Category',
        fieldValidationLabel: 'Category',
        options: [
            { id: 1, label: 'The Shawshank Redemption', year: 1994 },
            { id: 2, label: 'The Godfather', year: 1972 },
            { id: 10, label: 'The Godfather: Part II', year: 1974 },
            { id: 12, label: 'The Dark Knight', year: 2008 },
            { id: 5, label: '12 Angry Men', year: 1957 },
            { id: 9, label: "Schindler's List", year: 1993 },
            { id: 8, label: 'Pulp Fiction', year: 1994 },
            { id: 6, label: 'The Lord of the Rings: The Return of the King', year: 2003 }
        ],
        helperText: 'Please enter post category',
        type:'Text',
        validate: [
            {type:'Required',message:'Category is required field'},
            {type: 'Text', message:'Please select a post category'}
            
    ]

    }
}

export default addPostConfig;