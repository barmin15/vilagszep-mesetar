//these are the methods that return with the elements, that we don't need to store in a new database column 

export const getContinents = () => ["Ázsia", "Afrika", "Észak_Amerika", "Dél_Amerika", "Antarktika", "Európa", "Ausztrália"];

export const getAgeGroups = () => ["Idősebb_gyerekeknek", "Kisiskolás_korosztálytól", "Óvodás_kortól"];

export const getCopyRight = () => ["Csak_belső_használatra", "Köztulajdon"];

export const getStoryBody = () => {
    return { title: null, continent: null, ageGroup: null, copyRight: null, source: null, comment: null, text: null, storyBags: [], countries: [], keyWords: [] }; 
}