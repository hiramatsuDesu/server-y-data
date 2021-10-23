function onFileSelected(event){
    console.log('File Selected...');
    if(event.target.files && event.target.files[0]){
        const reader = new FileReader();
        const fileName = event.target.files[0].name;
        
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = function(){
            let poster = document.querySelector("#poster");
            let posterName = document.querySelector("#posterName");
            
            poster.value = reader.result;
            posterName.value = fileName;

            let image = document.querySelector("img");
            if(image){
                image.src = reader.result;
            }

        }
    }
}