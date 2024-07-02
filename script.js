let move_speed = 3,
  grativy = 0.5;
let bear = document.querySelector(".bear1");
let img = document.getElementById("bear1");
let bruhsound = new Audio("assets/bruh.mp3");
let music = new Audio("assets/POL-two-fat-gangsters-short.mp3");
music.loop = true;

// getting bear element properties
let bear_props = bear.getBoundingClientRect();

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector(".background").getBoundingClientRect();

let score_val = document.querySelector(".score_val");
let title = document.getElementById("title");
let handle = document.getElementById("handle");
let message = document.querySelector(".message");
let main_message = document.querySelector(".main_message");
let score_title = document.querySelector(".score_title");

let game_state = "Start";
img.style.display = "none";
message.classList.add("messageStyle");

document.addEventListener("click", (e) => {
  if (game_state != "Play") {
    document.querySelectorAll(".pipe_sprite").forEach((e) => {
      e.remove();
    });
    img.style.display = "block";
    bear.style.top = "40vh";
    game_state = "Play";
    main_message.innerHTML = "";
    title.innerHTML = "";
    handle.innerHTML = "";
    score_title.innerHTML = "Score : ";
    score_val.innerHTML = "0";
    message.classList.remove("messageStyle");
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
      bear_props = bear.getBoundingClientRect();

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
          music.pause();
          message.innerHTML =
            "Bruh! you died".fontcolor("red") +
            "<br>Press Enter To Restart Bruh!";
          message.classList.add("messageStyle");
          img.style.display = "none";

          return;
        } else {
          if (
            pipe_sprite_props.right < bear_props.left &&
            pipe_sprite_props.right + move_speed >= bear_props.left &&
            element.increase_score == "1"
          ) {
            score_val.innerHTML = +score_val.innerHTML + 1;
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
    bear_dy = bear_dy + grativy;
    document.addEventListener("click", () => {
      bear_dy = -8;
      if (bear_dy > 0) {
        img.src = "assets/Bear2.png";
        img.src = "assets/Bear1.png";
      }
    });

    document.addEventListener("click", () => {
      if (bear_dy < 0) {
        bruhsound.play();
      }
    });

    if (bear_props.top <= 0 || bear_props.bottom >= background.bottom) {
      game_state = "End";
      message.style.left = "28vw";
      window.location.reload();
      message.classList.remove("messageStyle");
      return;
    }
    bear.style.top = bear_props.top + bear_dy + "px";
    bear_props = bear.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;

  let pipe_gap = 35;

  function create_pipe() {
    if (game_state != "Play") return;

    if (pipe_seperation > 115) {
      pipe_seperation = 0;

      let pipe_posi = Math.floor(Math.random() * 43) + 8;
      let pipe_sprite_inv = document.createElement("div");
      pipe_sprite_inv.className = "pipe_sprite";
      pipe_sprite_inv.style.top = pipe_posi - 70 + "vh";
      pipe_sprite_inv.style.left = "100vw";

      document.body.appendChild(pipe_sprite_inv);
      let pipe_sprite = document.createElement("div");
      pipe_sprite.className = "pipe_sprite";
      pipe_sprite.style.top = pipe_posi + pipe_gap + "vh";
      pipe_sprite.style.left = "100vw";
      pipe_sprite.increase_score = "1";

      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
