here is example of data type:
interface ICountryCityUniversity {
    id: string,
    country: string,
    city: string[],
    universitys: {
        id: string,
        name: string,
        image: string,
        location: string,
        courses: {
            id: string,
            name: string,
            tutionFees: string,
            duration: string,
            description: string,
            applyBtnParms: string[], (country, city, university, subject)
        }[],
        description: string,
    }[]
}

Now your task is plese generate example of those data with 3 country, 3 City, 3 university, 3 Subject.