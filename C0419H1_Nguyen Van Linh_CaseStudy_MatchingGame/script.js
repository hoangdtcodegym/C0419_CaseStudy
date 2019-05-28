let count = 0;
let temp = [];
let checkwin =[];
let starttime;
let endtime;
let timeWon;
let PlayWin =["Linh","15000","Linh","15000"];
let nameplay = document.getElementById("nameplay");
let scoreplay = document.getElementById("scoreplay");

function ShowImage(number, colrow) {
    starttime = new Date()
    this.colrow = colrow;
    this.number = number;
    this.arrImg = [];

    this.addImg = function () {
        for (let i = 1; i <= this.number; i++) {
            this.arrImg.push(i, i);
            // console.log(this.arrImg);
        }
        return this.arrImg;
    };
    //Phuong thuc random img 11.22.33
    this.randomArr = function () {
        for (let k = this.arrImg.length - 1; k > 0; k--) {
            let h = Math.floor(Math.random() * (k + 1));
            let temp = this.arrImg[k];
            this.arrImg[k] = this.arrImg[h];
            this.arrImg[h] = temp;

        }
        console.log(this.arrImg);

        return this.arrImg;
    };
    this.drawImg = function () {
        this.randomArr();//goi Phuong thuc lay random thu tu
        let table = "<table>";
        for (let i = 0; i < this.colrow; i++) {
            table += "<tr>";
            for (let j = 0; j < this.colrow; j++) {

                let nameimg = this.arrImg[(this.colrow * i) + j];
                console.log(nameimg);
                table += "<td><img src='image0.png' onclick='Click(this,this.name)' name = '" + nameimg + "' ></td>";
            }
            table += "</tr></table>";
            let drawtabale = document.getElementById("table");
            drawtabale.innerHTML = table;
        }
    }
}


function Click(img, name) {
    count++;
    //console.log(count);
    this.name = name;

    if (count <= 2) {

        img.src = "image" + this.name + ".png";
        img.setAttribute("onclick","");

        console.log(img);
        temp.push(img);
      //  console.log(this.temp);

        if (count === 2) {
            setTimeout(Check, 700, temp[0], temp[1])
        }
    }
}


function Check(item1, item2) {
    if (item1.name !== item2.name) {
        item1.src = "image0.png";
        item1.setAttribute("onclick","Click(this,this.name)");

        item2.src = "image0.png";
        item2.setAttribute("onclick","Click(this,this.name)");



    }else{
        checkwin.push(1,1);
        let coutCheckWin = checkwin.length;
        if(coutCheckWin >=16){
            endtime = new Date();
            timeWon = endtime - starttime;
            let whoPlay = prompt("You Won with: "+timeWon+"mini second. Inset Your Name" );
            PlayWin.unshift(whoPlay, timeWon);
            let Board = new ShowImage(8, 4);
            Board.addImg();
            Board.drawImg();
            coutCheckWin = [];
            nameplay.innerHTML="";
            LeaderBoard();
        }

    }
    count = 0;
    temp = [];
}
function LeaderBoard(){
    for (let i = 0; i < PlayWin.length; i++){
        nameplay.innerHTML +="<span class='board'>"+PlayWin[i]+"</span>";
    }
}
function BoardReset(){
    let Board = new ShowImage(8, 4);
    Board.addImg();
    Board.drawImg();
    coutCheckWin = [];
}
LeaderBoard();
let Board = new ShowImage(8, 4);
Board.addImg();
Board.drawImg();


