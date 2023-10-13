var url = 'http://127.0.0.1:8081/registros/list'
var registroclient = async() => {
    try {
        const response = await fetch(url)
        const data = await response.json()
            //console.log(data[0].imagem)

        show(data)


    } catch (error) {
        console.error(error)
    }

}

registroclient()



function show(registros) {

    var div = document.getElementById('container'); // The parent <div>.
    div.innerHTML = '';

    for (i = 0; i <= registros.length - 1; i++) {

        regis.name = registros[i].id

        var divRight = document.createElement('a');
        divRight.href = 'registro/' + registros[i].id

        divRight.appendChild(regis);
        // Add the child DIVs to parent DIV.

        div.appendChild(divRight);

        // Note: Instead of <div>, you can also create a dynamic <table> to show the images. 
        // Here's an example ... https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm 
    }


}