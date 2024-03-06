let files = document.querySelector('#files')

//read file 
const readFiles = async() => {
    await fetch(`http://localhost:5000/api/file/all`,{
        method: 'GET'
    }).then(res => res.json())
    .then(res => {
        console.log(`res =`,res)
        printData(res.files)
    }).catch(err => console.log(err.message))
}

//to print the file
const printData = (data) => {
    data.forEach((item,index) => {
        files.innerHTML += `<div class="col-md-4 col-lg-4 col-sm-12 mt-2 mb-2">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="text-dark text-center text-capitalize"> ${item.filename}</h5>
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group">
                                            <li class="list-group-item">
                                                <strong>Original Name</strong>
                                                <span class="float-end text-success">${item.originalname}</span>
                                            </li>
                                            <li class="list-group-item">
                                                <strong>File Type</strong>
                                                <span class="float-end text-success">${item.mimetype}</span>
                                            </li>
                                            <li class="list-group-item">
                                                <strong>Size</strong>
                                                <span class="float-end text-success">${item.size}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-footer">
                                        <a href="${item.filename}" class="btn btn-success float-end" target="_blank">View</a>
                                    </div>
                                </div>
                            </div>`
    })
}

readFiles()