arr = [2,2,2,2,2,2,2,2,2]
Error.stackTraceLimit=100;
function toggle(num) {
  if(num == 0){
    return 1;
  }
  else{
    return 0;
  }
}
function isWinner(){
  if(arr[0]==arr[4]&&arr[4]==arr[8]&&arr[8]!=2){
    return arr[0];
  }
  if(arr[2]==arr[4]&&arr[4]==arr[6]&&arr[6]!=2){
    return arr[2];
  }
  if(arr[0]==arr[3]&&arr[3]==arr[6]&&arr[6]!=2){
    return arr[0];
  }
  if(arr[1]==arr[4]&&arr[4]==arr[7]&&arr[7]!=2){
    return arr[1];
  }
  if(arr[2]==arr[5]&&arr[5]==arr[8]&&arr[8]!=2){
    return arr[2];
  }
  for(var a=0;a<9;a+=1){
    if(arr[a]==2){
      return 2;
    }
  }
  return 3;
}
// 3 means tie
//Bot is 0
var bota = 0
function score(mover,arr){
  scoreA = isWinner()
  if(scoreA==bota){
    return 10;
  }
  else if(scoreA==toggle(bota)){
    return -10;
  }
  else if(scoreA==3){
    return 0;
  }
  let ret = 0;
  for(let b=0;b<9;b+=1){
    let temp = arr[b]
    if(arr[b]==2){
      arr[b] = mover;
      ret+=score(toggle(mover),arr);
      arr[b] = 2
    }
  }
  return ret;
}
function bot(){
  max = -Infinity;
  maxMove = 10;
  for(i=0;i<9;i+=1){
    if(arr[i]==2){
      arr[i]=bota;
      curr = score(toggle(bota),arr)
      if(curr>max){
        maxMove=i;
        max = curr;
      }
      arr[i]=2
    }
  }
  return maxMove;
}
$(document).ready(function() {
  color = ["green","red"]
  // 0 is O
  // 1 is X
  move = 1
  won = false
  winner = 2
  $('.box').click(function () {
    if(!won){
      index = parseInt($(this).attr('id'))
      if(arr[index]==2){
          $(this).css('background-color',color[move])
          arr[index]=move
          move = toggle(move);
      }
      if(isWinner()==0||isWinner()==1){
        alert(isWinner()+" Wins")
        winner = isWinner()
        console.log(isWinner())
        won = true
      }
      if(isWinner()==3){
        alert("Tie!")
        won = true
        winner = 3
        move = 1
      }
      if(move==bota){
        maxMove = bot()
        if(maxMove!=10){
          arr[maxMove]=bota;
          console.log(maxMove)
          $('#'+ maxMove).css('background-color',color[move]);
          move = toggle(move)
        }
      }
    }
  });
  $('#btn').click(function() {
    arr = [2,2,2,2,2,2,2,2,2]
    $('.box').css('background-color','rgb(100,100,100)')
    won = false
    move = 1
    winner = 2
  });
});
