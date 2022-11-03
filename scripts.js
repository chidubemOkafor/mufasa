let move_speed = 3,
  gravity = 0.5;
let bear1 = document.querySelector(".bear1");
let img = document.getElementById("bear1");

let bear_props = bear1.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();
let score_val = document.querySelector(".score_val");
let message = document.getElementById("message");
let score_title = document.querySelector(".score_title");

let game_state = "start";
img.style.display = "none";
message.classList.add("messageStyle");

document.addEventListener("Keydown", (e) => {
  if (e.key == "Enter" && game_state != "start") {
    document.querySelectorAll(",pipe_sprite").forEach((e) => {
      e.remove();
    });
    img.style.display = "block";
    bear1.style.top = "40vh";
    game_state = "start";
    message.innerHTML = "";
    score_title.innerHTML = "score: ";
    score_val.innerHTML = "0";
    message.classList.remove("messageStyle");
    play();
  }
});

function play() {
  function move() {
    if (game_state != "start") return;

    let pipe_sprite = document.querySelectorAll(".pipe_sprite");
    pipe_sprite.forEach((element) => {
      let pipe_sprite_props = element.getRoundingClientRect();
      bear_props = bear1.getBoundingClientRect();

      if (pipe_sprite_props.right <= 0) {
        element.remove();
      } else {
        if (
          bear_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
          bear_props.left + bear_props.width > pipe_sprite_props.left &&
          bear_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
          bear_props.top + bear_props.height > pipe_sprite_props.top
        ) {
          game_state = "End";
          message.innerHTML =
            "bruh! you died" + `<br>Press Enter To Restart bruh`;
          message.classList.add("messageStyle");
          img.style.display = "none";
          return;
        } else {
          if (
            pipe_sprite_prop.right < bear_props.left &&
            pipe_sprite_props.right + move_speed >= bear_props.left &&
            element.increase_score == "1"
          ) {
          }
        }
      }
    });
  }
}
