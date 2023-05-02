const apiKey = "AIzaSyC4lmnXVt8yljrKfag8JDQQ50j5O0n13EE";

/**
 * Code for populating the font picker dropdown with google fonts api
 */



/**
 * Get array of fonts 
 * Returns array of fonts form the google fonts api
 */
const getFontList = async function() {
    const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;

    const results = await fetch(url)
      .then(response => response.json())

      .then(json => {return json.items});

    return results;
}

export { getFontList }