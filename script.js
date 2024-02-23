(()=>{
  for(const item of document.querySelectorAll(".list li")){
    item.addEventListener("click",(evente)=>{
        for(const section of document.querySelectorAll(".main section")){
            section.style.display="none";
        }
    document.getElementById(evente.target.textContent).style.display="block";

    
    })
  };
})()