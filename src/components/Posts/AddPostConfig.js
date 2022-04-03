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
        validation: 'string'
    },
    postCategory: {
        disablePortal: true,
        id: "postCategory",
        inputId: "postCategory",
        required: true,
        options: [
            { label: 'The Shawshank Redemption', year: 1994 },
            { label: 'The Godfather', year: 1972 },
            { label: 'The Godfather: Part II', year: 1974 },
            { label: 'The Dark Knight', year: 2008 },
            { label: '12 Angry Men', year: 1957 },
            { label: "Schindler's List", year: 1993 },
            { label: 'Pulp Fiction', year: 1994 },
            { label: 'The Lord of the Rings: The Return of the King', year: 2003 }
        ],
        helperText: 'Please enter post category',
        type:'Text',
        validation: 'string'

    }
}

export default addPostConfig;