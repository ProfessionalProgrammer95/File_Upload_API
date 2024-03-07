let files = document.querySelector('#files')

//read file 
const readFiles = async() => {
    await fetch(`/api/file/all`,{
        method: 'GET'
    }).then(res => res.json())
    .then(res => {
        console.log(`res =`,res)
        printData(res.files)
    }).catch(err => console.log(err.message))
}

//delete file
const delFile = async (id) => {
    if(window.confirm(`Are you  sure to delete a file?`)){
        await fetch(`/api/file/delete/${id}`,{
            method: "DELETE"
        }).then(res => res.json())
        .then(res=> {
            alert(res.msg)
            window.location.reload()
        }).catch(err => console.log(err.msg))
    } else {
        return;
    }
}

//to print the file
const printData = (data) => {
    data.forEach((item,index) => {
        files.innerHTML += `<div class="col-md-4 col-lg-4 col-sm-12 mt-2 mb-2">
                                <div class="card">
                                    <div class="card-header justify-content-between d-flex">
                                        <h5 class="text-dark text-center text-capitalize"> ${item.filename}</h5>
                                        <button onclick="delFile('${item._id}')" class="btn-close"></button>
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