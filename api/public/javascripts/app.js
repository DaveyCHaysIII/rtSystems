var sysTable = document.getElementById('sysTable');
var genSys = document.getElementById('genSys');

function popSysTable(){
    if(sysTable.style.display == "none"){
        //getTable();
        sysTable.style.display = "block";
    } 

}

function getTable(){
    //let getObjectData = new System();
    //populate table with getObjectData
}
console.log('hello world')

genSys.addEventListener('click', popSysTable);