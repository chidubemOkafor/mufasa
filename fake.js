let move_speed = 3,
  gravity = 0.5;
let bear1 = document.querySelector(".bear1");
let img = document.getElementById("bear1");
let sound_point = new Audio("assets/bruh.mp3");
let music = new Audio("assets/POL-two-fat-gangsters-short.mp3");

let bear_props = bear1.getBoundingClientRect();

let background = document.querySelector(".background").getBoundingClientRect();
let score_val = document.querySelector(".score_val");
let message = document.getElementById(".message");
let score_title = document.querySelector(".score_title");

let game_state = "start";
img.style.display = "none";
message.classList.add("messageStyle");

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && game_state != "Play") {
    document.querySelectorAll(".pipe_sprite").forEach((e) => {
      e.remove();
    });
    img.style.display = "block";
    bear1.style.top = "40vh";
    game_state = "Play";
    message.innerHTML = "";
    score_title.innerHTML = "Score: ";
    score_val.innerHTML = "0";
    message.classList.remove("messageStyle");
    alert("working");
    music.play();
    play();
  }
});

function play() {
  function move() {
    if (game_state != "Play") return;

    let pipe_sprite = document.querySelectorAll(".pipe_sprite");
    pipe_sprite.forEach((element) => {
      let pipe_sprite_props = element.getBoundingClientRect();
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
            pipe_sprite_props.right < bear_props.left &&
            pipe_sprite_props.right + move_speed >= bear_props.left &&
            element.increase_score == "1"
          ) {
            score_val.innerHTML = score_val.innerHTML + 1;
          }
          element.style.left = pipe_sprite_props.left - move_speed + "px";
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let bear_dy = 0;
  function apply_gravity() {
    if (game_state != "Play") return;
    bear_dy = bear_dy + gravity;
    document.addEventListner("click", (e) => {
      if (e.key == "click" || e.key == "") {
        img.src = "assets/Bear2.png";
        bear_dy = -7.6;
        sound_point.play();
      }
    });
    document.addEventListener("click", (e) => {
      if (e.key == "click" || e.key == "") {
        img.src = "assets/Bear1.png";
      }
    });

    if (bear_props.top <= 0 || bear_props.bottom >= background.bottom) {
      game_state = "End";
      message.style.left = "28vw";
      window.location.reload();
      message.classList.remove("messageStyle");
      return;
    }
    bear_style.top = bear_props.top + bear_dy + "px";
    bear_props = bear1.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;
  let pipe_gap = 35;

  function create_pipe() {
    if (game_state != "play") return;

    if (pipe_seperation > 115) {
      pipe_seperation = 0;
      let pipe_position = Math.floor(Math.random() * 43) + 8;
      let pipe_sprite_inv = document.createElement("div");
      pipe_sprite_inv.style.top = pipe_position - 70 + "vh";
      pipe_sprite_inv.style.left = "100vw";

      docyument.body.appendChild(pipe_sprite_inv);
      let pipe_sprite = document.createElement("div");
      pipe_sprite.className = "pipe_sprite";
      pipe_sprite.style.top = pipe_position + pipe_gap + "vh";
      pipe_sprite.style.left = "100vw";
      pipe_sprite.increase_score = "1";

      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
