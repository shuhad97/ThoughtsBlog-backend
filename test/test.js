const listHelper = require('../utils/list_helper')
const likesTest = require('../utils/list_helper')
const mostLikesTest = require('../utils/list_helper')

describe('blog tests', ()=>{
   
    test('dummy returns one', () => {
        const blogs = []
    
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })


    test( 'total likes', () =>{
        const blogs = [1,3]


        const result =likesTest.totalLike(blogs)
        expect(result).toBe(4)

    })

    test('most ikes', () =>{
        const blogs = [
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12
            },
            {
                title: "CMy one",
                author: "James Dyson",
                likes: 14
            }


        ]

        const result = mostLikesTest.mostLikes(blogs)
        expect(result).toEqual({
            title: "CMy one",
            author: "James Dyson",
            likes: 14
        })


    })

})