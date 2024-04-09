module.exports= (temp, productDetaisl) => {
    let result = temp.replace(/{%IMAGE%}/g, productDetaisl.image);
    result = result.replace(/{%PRICE%}/g, productDetaisl.price);
    result = result.replace(/{%NAME%}/g, productDetaisl.title);
    result = result.replace(/{%CATEGORY%}/g, productDetaisl.category);
    result = result.replace(/{%ID%}/g, productDetaisl.id);
    result = result.replace(/{%DESCRIPTION%}/g,productDetaisl.description)

    return result;
}