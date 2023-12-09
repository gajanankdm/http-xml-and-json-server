let cl = console.log;
const cardContainer = document.getElementById("cardContainer");
const titleControl = document.getElementById("title");
const bodyControl = document.getElementById("body");
const userIdControl = document.getElementById("userId");

const submitBtn = document.getElementById("addBtn");
const UpdateBtn = document.getElementById("UpdateBtn");



let baseUrl = ` http://localhost:3000`;

let postUrl = `${baseUrl}/posts`;
const onEdit =(ele) =>{
   // cl(ele)
    let editId = ele.closest(".card").id;
    localStorage.setItem("editId",editId);
    let editUrl = `${baseUrl}/posts/${editId}`;


    makeApiCall("GET",editUrl)
    .then(res =>{
        cl(res)
        let obj = JSON.parse(res);
        titleControl.value = obj.title;
        bodyControl.value = obj.body;
        userIdControl.value = obj.userId;
        

        UpdateBtn.classList.remove("d-none");
        submitBtn.classList.add("d-none");
    })
    .catch(cl)

}

const onDelete = (ele) =>{
    cl(ele)
    let deleteId = ele.closest(".card").id;
    let deleteUrl = `${baseUrl}/posts/${deleteId}`;

    makeApiCall("DELETE", deleteUrl)
    .then(res =>{
        cl(res)
    })
    .catch(err =>{
        cl(err)
    })
    
}

const templatingOfPosts =(arr) =>{
    let result = ``;
    arr.forEach(post => {
        result += `
        <div class="card md-4" id="${post.id}">
                <div class="card-header">
                    <h2> ${post.title}</h2>
                </div>
                <div class="card-body">
                    <p>
                        ${post.body}
                    </p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-outline-primary" onclick="onEdit(this)">
                    Edit</button>
                    <button class="btn btn-outline-danger" onclick="onDelete(this)">
                        Delete</button>
                </div>
               </div>
               `
        
    });
    cardContainer.innerHTML = result;
}
const makeApiCall = (methodName,apiUrl,body = null) =>{
return  new Promise((resolve,reject) =>{
    let xhr  = new XMLHttpRequest();
    xhr.open(methodName,apiUrl);
    xhr.setRequestHeader("content-type","application/json")
   if(body){
    xhr.send(JSON.stringify(body));
   }else{
    xhr.send()
   }
    // default error set

    xhr.onload = function(){
        if(xhr.status>=200 && xhr.status<300){
            resolve(xhr.responseText)
        }else{
            reject(`API call is failed with status : ${xhr.ststus}`)
        }
    }
})

}
makeApiCall("GET",postUrl)
.then(res =>{
   // cl(res)
    templatingOfPosts(JSON.parse(res))
})
.catch(err =>{
    cl(err)
})

const onPostUpdate =(ele) =>{

    let editId = localStorage.getItem("editId")
    let updateUrl = `${baseUrl}/posts/${editId}`
    let updatedObj = {
        title : titleControl.value,
        body : bodyControl.value,
        userId : userIdControl.value,
        id : editId
    }
    cl(updatedObj)
    // to set editid in localstorage and at time get the id
   
    makeApiCall("PUT",updateUrl,updatedObj)
    .then(res =>{
        cl(res)
    })
    .catch(err =>{
        cl(err)
    })
}
const onsubmit =(eve) =>{
    eve.preventDefault();
    let post ={
        title: titleControl.value,
        body:bodyControl.value,
        userId:userIdControl.value
    }
    cl(post);
    makeApiCall("POST",postUrl,post)
    .then(res =>{
        cl(res)
    }).catch(err =>{
        cl(err)
    })
}
UpdateBtn.addEventListener("click",onPostUpdate)
postForm.addEventListener("submit",onsubmit)
// work is completed


