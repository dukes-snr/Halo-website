import * as HaloNotchMock from "@/lib/notch-mock";

if (typeof window !== "undefined") {
  window.HaloNotchMock = HaloNotchMock;
}

export function initDroppyMock() {
  if (typeof document === "undefined") return;
  if (document.documentElement.getAttribute("data-dmk-ready") === "1") return;

        var mock = document.getElementById("droppy-mock");
        var notch = document.getElementById("dmk-notch");
        if (!mock || !notch) return;
        document.documentElement.setAttribute("data-dmk-ready", "1");
        var mockVisible = true;
        new IntersectionObserver(function (entries) {
          mockVisible = entries[0].isIntersecting;
          mock.classList.toggle("is-offscreen", !mockVisible);
          if (mockVisible) render();
        }, { rootMargin: "120px 0px", threshold: 0.001 }).observe(mock);

        var pressed = false;
        function syncLaneInd() {
          var ind = document.getElementById("dmk-lane-ind");
          if (!ind) return;
          var active = document.querySelector(".dmk__lane-seg.is-active");
          if (!active) { ind.style.opacity = "0"; return; }
          ind.style.opacity = "1";
          ind.style.left = active.offsetLeft + "px";
          ind.style.width = active.offsetWidth + "px";
        }
        /* Segment widths shift when the tray count pill appears; keep the
           chip glued through any relayout. */
        if (window.ResizeObserver) {
          var laneRO = new ResizeObserver(function () { syncLaneInd(); });
          document.querySelectorAll(".dmk__lane-pill, .dmk__lane-seg").forEach(function (el) { laneRO.observe(el); });
        }
        function openShelf() { if (window.HaloNotchMock) { HaloNotchMock.openShelf(notch); } else { notch.classList.remove("is-mini", "is-peek"); notch.classList.add("is-open"); } requestAnimationFrame(syncLaneInd); }
        function closeShelf() {
          if (window.HaloNotchMock) { HaloNotchMock.closeShelf(notch); } else { notch.classList.remove("is-open", "is-queue", "is-out", "is-tray", "is-widgets", "is-cal"); }
          var lc = document.querySelector(".dmk__lane-circle");
          if (lc) lc.classList.remove("is-active");
          var segs = document.querySelectorAll(".dmk__lane-seg");
          segs.forEach(function (x, i) { x.classList.toggle("is-active", i === 0); });
          syncLaneInd();
          if (!window.HaloNotchMock) notch.classList.add("is-mini");
          var qb = document.getElementById("dmk-queue-btn");
          if (qb) qb.classList.remove("is-active");
          var ob = document.getElementById("dmk-out-btn");
          if (ob) ob.classList.remove("is-active");
        }
        var hintNode = document.getElementById("dmk-hint");
        function dismissHint() {
          if (hintNode) { hintNode.classList.add("is-gone"); hintNode = null; }
        }
        notch.addEventListener("pointerdown", function () {
          dismissHint();
          if (notch.classList.contains("is-open") || notch.classList.contains("is-cloud") ||
              notch.classList.contains("is-cv") || notch.classList.contains("is-cvmini") ||
              notch.classList.contains("is-shud")) return;
          pressed = true;
          notch.classList.add("is-pressing");
        });
        function releasePress(open) {
          if (!pressed) return;
          pressed = false;
          notch.classList.remove("is-pressing");
          if (open) openShelf();
        }
        notch.addEventListener("pointerup", function () { releasePress(true); });
        notch.addEventListener("pointerleave", function () { releasePress(false); });
        notch.addEventListener("keydown", function (e) {
          if (notch.classList.contains("is-cloud") || notch.classList.contains("is-cv") || notch.classList.contains("is-cvmini")) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            dismissHint();
            if (notch.classList.contains("is-open")) closeShelf(); else openShelf();
          }
        });
        document.addEventListener("pointerdown", function (e) {
          if (notch.classList.contains("is-open") && !notch.contains(e.target)) closeShelf();
        });

        var DURATION = 154;
        var elapsed = 32;
        var playing = true;
        var elNode = document.getElementById("dmk-el");
        var remNode = document.getElementById("dmk-rem");
        var fillNode = document.getElementById("dmk-fill");
        function fmt(t) {
          t = Math.max(0, Math.round(t));
          return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");
        }
        function render() {
          elNode.textContent = fmt(elapsed);
          remNode.textContent = "-" + fmt(DURATION - elapsed);
          fillNode.style.width = ((elapsed / DURATION) * 100).toFixed(2) + "%";
        }
        window.setInterval(function () {
          if (!playing) return;
          elapsed += 1;
          if (elapsed >= DURATION) elapsed = 0;
          if (mockVisible) render();
        }, 1000);
        render();
        function togglePlay() {
          playing = !playing;
          var bars = document.querySelectorAll(".dmk__wave span, .dmk__mini-wave i");
          if (!playing) {
            /* Freeze each bar at its live height, then glide it to rest. */
            bars.forEach(function (bar) { bar.style.height = getComputedStyle(bar).height; });
            mock.classList.add("is-paused");
            void mock.offsetHeight;
            bars.forEach(function (bar) {
              bar.style.transition = "height 460ms cubic-bezier(0.32,1.22,0.36,1)";
              bar.style.height = "";
            });
            window.setTimeout(function () {
              bars.forEach(function (bar) { bar.style.transition = ""; });
            }, 500);
          } else {
            mock.classList.remove("is-paused");
            bars.forEach(function (bar) { bar.style.height = ""; bar.style.transition = ""; });
          }
          document.getElementById("dmk-play").setAttribute("aria-label", playing ? "Pause" : "Play");
          var mc = document.getElementById("dmk-mini-ctl");
          if (mc) mc.setAttribute("aria-label", playing ? "Pause" : "Play");
        }
        document.getElementById("dmk-play").addEventListener("click", togglePlay);
        var miniCtl = document.getElementById("dmk-mini-ctl");
        if (miniCtl) {
          miniCtl.addEventListener("pointerdown", function (e) {
            e.stopPropagation();
            miniCtl.classList.add("is-forced");
          });
          miniCtl.addEventListener("pointerup", function (e) {
            e.stopPropagation();
            if (miniCtl.classList.contains("is-forced")) {
              miniCtl.classList.remove("is-forced");
              togglePlay();
            }
          });
          ["pointerleave", "pointercancel"].forEach(function (ev) {
            miniCtl.addEventListener(ev, function () { miniCtl.classList.remove("is-forced"); });
          });
          miniCtl.addEventListener("click", function (e) { e.stopPropagation(); });
        }
        document.getElementById("dmk-rew").addEventListener("click", function () { elapsed = Math.max(0, elapsed - 15); render(); });
        document.getElementById("dmk-fwd").addEventListener("click", function () { elapsed = Math.min(DURATION - 1, elapsed + 15); render(); });

        var CARDS = [
          { kind: "WW", when: "4 weeks ago", body: "", chars: 15, idx: 1, pin: true, board: "Droppy", app: "droppy" },
          { kind: "Follow-up", when: "3 days ago", body: "Invoice #2041 sent. Follow up Friday if unpaid.", chars: 47, idx: 13, pin: true, board: "Work", pinTint: "work", app: "chrome" },
          { kind: "Friendly tone", when: "1 week ago", body: "Rewrite this in a friendlier tone, keep it under 40 words.", chars: 59, idx: 14, pin: true, board: "Prompts", pinTint: "prompts", app: "claude" },
          { kind: "Image", when: "1 minute ago", img: "/assets/shelf-stack/media.webp", dims: "1816 \u00d7 568", idx: 2, app: "claude" },
          { kind: "Link", when: "8 minutes ago", body: "https://open.spotify.com/track/1Qrg8KqiBpW07V7PNxwwwL", chars: 53, idx: 3, app: "spotify" },
          { kind: "Text", when: "14 minutes ago", body: "yo the new droppy beta is actually insane, try the convert thing", chars: 64, idx: 4, app: "discord" },
          { kind: "Image", when: "29 minutes ago", img: "/assets/shelf-stack/calendar.webp", dims: "2266 \u00d7 1142", idx: 5, app: "chrome" },
          { kind: "Link", when: "36 minutes ago", body: "https://getdroppy.app/changelog", chars: 31, idx: 6, app: "safari" },
          { kind: "Image", when: "42 minutes ago", img: "/assets/shelf-stack/files.webp", dims: "1256 \u00d7 818", idx: 7, app: "claude" },
          { kind: "Text", when: "51 minutes ago", body: "Stationsplein 1, 1012 AB Amsterdam", chars: 34, idx: 8, app: "maps" },
          { kind: "Image", when: "1 hour ago", img: "/assets/shelf-stack/messages.webp", dims: "1406 \u00d7 914", idx: 9, app: "chrome" },
          { kind: "Text", when: "1 hour ago", body: "Secure checkout powered by Stripe. Prices shown in your local currency.", chars: 57, idx: 10, app: "safari" },
          { kind: "Image", when: "2 hours ago", img: "/assets/shelf-stack/timer.webp", dims: "841 \u00d7 311", idx: 11, app: "claude" },
          { kind: "Text", when: "2 hours ago", body: "Your Mac, just way better.", chars: 26, idx: 12, app: "discord" }
        ];
        var row = document.getElementById("dmk-clip-row");
        var glassIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="5"/></svg>';
        var linesIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
        if (row) CARDS.forEach(function (c) {
          var card = document.createElement("div");
          card.__mock = c;
          card.className = "dmk__card" +
            (c.pin ? " dmk__card--pin" + (c.pinTint ? " dmk__card--pin-" + c.pinTint : "") : "") +
            (c.idx === 1 ? " is-selected" : "");
          var APP_ICONS = {
            droppy: "/assets/brand/droppy-icon-default-128.png",
            claude: "/assets/mock/icon-claude.webp",
            chrome: "/assets/mock/icon-chrome.webp",
            safari: "/assets/mock/icon-app-safari.webp",
            spotify: "/assets/mock/icon-app-spotify.webp",
            discord: "/assets/mock/icon-app-discord.webp",
            maps: "/assets/mock/icon-app-maps.webp"
          };
          var appSrc = APP_ICONS[c.app] || APP_ICONS.claude;
          var app = '<img class="dmk__card-appimg" src="' + appSrc + '" alt="">';
          var leftChip = c.kind === "Image"
            ? c.dims
            : (c.pin ? '<span class="dmk__star">\u2605</span>' : "") + c.chars + " characters";
          var chips =
            '<span class="dmk__chip dmk__chip--left">' + leftChip + "</span>" +
            '<span class="dmk__chip dmk__chip--right">' + linesIcon + c.idx + "</span>";
          var body = c.kind === "Image"
            ? '<div class="dmk__card-body dmk__card-body--img"><div class="dmk__card-img"><img src="' + c.img + '" alt="" loading="lazy">' + chips + "</div></div>"
            : '<div class="dmk__card-body">' + (c.body || "") + chips + "</div>";
          card.innerHTML =
            '<div class="dmk__card-head"><div><div class="dmk__card-kind">' + c.kind + '</div><div class="dmk__card-when">' + c.when + "</div></div>" + app + "</div>" +
            body;
          row.appendChild(card);
        });

        /* Queue panel: real tracks from the library. */
        var QUEUE = [
          { t: "Roulette", a: "Bilal Wahib", img: "/assets/mock/queue-art-1.webp" },
          { t: "Habiba", a: "Boef", img: "/assets/mock/queue-art-2.webp" },
          { t: "Heroine (Cryogenic's Second Shot)", a: "CRYOGENiC", img: "/assets/mock/queue-art-3.webp" },
          { t: "Save the Day", a: "D-Block & S-te-Fan & Rebelion", img: "/assets/mock/queue-art-4.webp" },
          { t: "Party at My Place", a: "D-Sturb & Alee", img: "/assets/mock/queue-art-5.webp" },
          { t: "HYPNOTYZED", a: "The Dark Horror", img: "/assets/mock/queue-art-6.webp" }
        ];
        var queueList = document.getElementById("dmk-queue-list");
        var addIcon = '<img src="/assets/mock/icon-sf-qadd.webp" alt="">';
        QUEUE.forEach(function (q) {
          var row = document.createElement("div");
          row.className = "dmk__qrow";
          row.innerHTML = '<img src="' + q.img + '" alt="">' +
            '<span class="dmk__qrow-meta"><span class="dmk__qrow-title">' + q.t + '</span><span class="dmk__qrow-artist">' + q.a + "</span></span>" +
            '<span class="dmk__qrow-add">' + addIcon + "</span>";
          queueList.appendChild(row);
        });
        var queueBtn = document.getElementById("dmk-queue-btn");
        queueBtn.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
        queueBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          var on = notch.classList.toggle("is-queue");
          queueBtn.classList.toggle("is-active", on);
        });
        /* Tap a song: it glides to the top of the list (FLIP) and pulses. */
        var queueBusy = false;
        queueList.addEventListener("click", function (e) {
          var row = e.target.closest ? e.target.closest(".dmk__qrow") : null;
          if (!row || row === queueList.firstElementChild || queueBusy) return;
          queueBusy = true;
          /* First the pulse announces the queueing... */
          row.classList.add("is-pulsing");
          window.setTimeout(function () {
            /* ...then the song glides to the top of the list. */
            var rows = Array.prototype.slice.call(queueList.children);
            var before = new Map();
            rows.forEach(function (r) { before.set(r, r.getBoundingClientRect().top); });
            queueList.prepend(row);
            queueList.scrollTo({ top: 0, behavior: "smooth" });
            rows.forEach(function (r) {
              var delta = before.get(r) - r.getBoundingClientRect().top;
              if (!delta) return;
              r.style.transform = "translateY(" + delta + "px)";
              r.style.transition = "none";
            });
            void queueList.offsetHeight;
            rows.forEach(function (r) {
              r.style.transition = "transform 480ms cubic-bezier(0.32,1.22,0.36,1)";
              r.style.transform = "";
            });
            window.setTimeout(function () {
              rows.forEach(function (r) { r.style.transition = ""; });
              row.classList.remove("is-pulsing");
              queueBusy = false;
            }, 620);
          }, 780);
        });

        /* Audio output picker. */
        var outBtn = document.getElementById("dmk-out-btn");
        var outList = document.getElementById("dmk-out-list");
        outBtn.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
        outBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          var on = notch.classList.toggle("is-out");
          outBtn.classList.toggle("is-active", on);
        });
        /* Whole-capsule volume slide, iOS style. */
        var volDrag = null;
        outList.addEventListener("pointerdown", function (e) {
          if (e.target.closest && e.target.closest(".dmk__orow-check")) return;
          var row = e.target.closest ? e.target.closest(".dmk__orow") : null;
          if (!row) return;
          e.stopPropagation();
          volDrag = row;
          row.setPointerCapture(e.pointerId);
          setRowVol(row, e);
        });
        outList.addEventListener("pointermove", function (e) {
          if (volDrag) setRowVol(volDrag, e);
        });
        ["pointerup", "pointercancel"].forEach(function (ev) {
          outList.addEventListener(ev, function () { volDrag = null; });
        });
        function setRowVol(row, e) {
          var r = row.getBoundingClientRect();
          var frac = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
          row.style.setProperty("--vol", (frac * 100).toFixed(1) + "%");
        }
        /* Only the circle switches the source. */
        outList.addEventListener("click", function (e) {
          var check = e.target.closest ? e.target.closest(".dmk__orow-check") : null;
          if (!check) return;
          e.stopPropagation();
          var row = check.closest(".dmk__orow");
          if (!row || row.classList.contains("is-current")) return;
          var rows = Array.prototype.slice.call(outList.children);
          var before = new Map();
          rows.forEach(function (r) { before.set(r, r.getBoundingClientRect().top); });
          rows.forEach(function (r) { r.classList.remove("is-current"); });
          row.classList.add("is-current");
          outList.prepend(row);
          rows.forEach(function (r) {
            var delta = before.get(r) - r.getBoundingClientRect().top;
            if (!delta) return;
            r.style.transform = "translateY(" + delta + "px)";
            r.style.transition = "none";
          });
          void outList.offsetHeight;
          rows.forEach(function (r) {
            r.style.transition = "transform 460ms cubic-bezier(0.32,1.22,0.36,1)";
            r.style.transform = "";
          });
          window.setTimeout(function () { rows.forEach(function (r) { r.style.transition = ""; }); }, 500);
        });

        /* Floating lane segments: house = player, tray = file tray. */
        var laneSegs = document.querySelectorAll(".dmk__lane-seg");
        Array.prototype.forEach.call(laneSegs, function (seg, idx) {
          seg.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
          seg.addEventListener("click", function (e) {
            e.stopPropagation();
            if (!notch.classList.contains("is-open")) return;
            laneSegs.forEach(function (x) { x.classList.remove("is-active"); });
            seg.classList.add("is-active");
            syncLaneInd();
            if (window.HaloNotchMock) { HaloNotchMock.setLane(notch, null); } else { notch.classList.remove("is-tray", "is-widgets", "is-queue", "is-out", "is-cal"); }
            document.querySelector(".dmk__lane-circle").classList.remove("is-active");
            document.getElementById("dmk-queue-btn").classList.remove("is-active");
            document.getElementById("dmk-out-btn").classList.remove("is-active");
            if (seg.id === "dmk-lane-tray") {
              if (window.HaloNotchMock) HaloNotchMock.setLane(notch, "is-tray"); else { notch.classList.add("is-tray", "is-filled"); }
              spawnTrayFiles();
            } else if (seg.querySelector('img[src*="grid"]')) {
              if (window.HaloNotchMock) HaloNotchMock.setLane(notch, "is-widgets"); else notch.classList.add("is-widgets");
            }
          });
        });
        /* Tray files: auto-populate, tap to select, hover-x to delete. */
        var TRAY_FILES = [
          { name: "Brief.docx", doc: true },
          { name: "Cover.png", img: "/assets/shelf-stack/media.webp" },
          { name: "Notes.png", img: "/assets/shelf-stack/files.webp" },
          { name: "Timer.png", img: "/assets/shelf-stack/timer.webp" },
          { name: "Reply.png", img: "/assets/shelf-stack/messages.webp" }
        ];
        var trayFiles = document.getElementById("dmk-tray-files");
        var trayCount = document.getElementById("dmk-tray-count");
        var checkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 12.5 10 17.5 19 7"/></svg>';
        var xSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
        function trayLiveCount() { return trayFiles.querySelectorAll(".dmk__tfile:not(.is-out)").length; }
        var trayPane = document.querySelector(".dmk__tray");
        function syncTrayEdges() {
          trayPane.classList.toggle("can-left", trayFiles.scrollLeft > 4);
          trayPane.classList.toggle("can-right", trayFiles.scrollLeft < trayFiles.scrollWidth - trayFiles.clientWidth - 4);
        }
        function syncTrayCount() {
          var n = trayLiveCount();
          trayCount.textContent = n;
          document.getElementById("dmk-lane-tray").classList.toggle("has-count", n > 0);
          if (n === 0) notch.classList.remove("is-filled");
          requestAnimationFrame(syncLaneInd);
          window.setTimeout(syncTrayEdges, 450);
        }
        trayFiles.addEventListener("scroll", syncTrayEdges, { passive: true });
        var tDrag = false, tMoved = false, tStartX = 0, tStartScroll = 0;
        trayFiles.addEventListener("pointerdown", function (e) {
          tDrag = true;
          tMoved = false;
          tStartX = e.clientX;
          tStartScroll = trayFiles.scrollLeft;
        });
        trayFiles.addEventListener("pointermove", function (e) {
          if (!tDrag) return;
          if (Math.abs(e.clientX - tStartX) > 6) tMoved = true;
          if (tMoved) trayFiles.scrollLeft = tStartScroll - (e.clientX - tStartX);
        });
        ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
          trayFiles.addEventListener(ev, function () { tDrag = false; });
        });
        function makeTrayTile(f, delay) {
          var tile = document.createElement("div");
          tile.className = "dmk__tfile";
          tile.innerHTML =
            '<span class="dmk__tfile-thumb' + (f.doc ? " dmk__tfile-thumb--doc" : "") + '">' +
            (f.img ? '<img src="' + f.img + '" alt="">' : "") +
            '<span class="dmk__tfile-check">' + checkSvg + "</span>" +
            '<span class="dmk__tfile-x">' + xSvg + "</span>" +
            "</span>" +
            '<span class="dmk__tfile-name">' + f.name + "</span>";
          trayFiles.insertBefore(tile, trayFiles.querySelector(".dmk__tray-acts"));
          window.setTimeout(function () { tile.classList.add("is-in"); }, delay);
          return tile;
        }
        function spawnTrayFiles() {
          if (trayFiles.querySelector(".dmk__tfile")) return;
          TRAY_FILES.forEach(function (f, i) { makeTrayTile(f, 70 * i + 60); });
          syncTrayCount();
        }
        trayFiles.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
        trayFiles.addEventListener("click", function (e) {
          e.stopPropagation();
          if (tMoved) { tMoved = false; return; }
          var x = e.target.closest ? e.target.closest(".dmk__tfile-x") : null;
          if (x) {
            var tile = x.closest(".dmk__tfile");
            tile.classList.add("is-out");
            window.setTimeout(function () { tile.remove(); syncTrayCount(); }, 420);
            trayCount.textContent = Math.max(0, trayLiveCount() - 1);
            return;
          }
          var thumb = e.target.closest ? e.target.closest(".dmk__tfile-thumb") : null;
          if (thumb) thumb.closest(".dmk__tfile").classList.toggle("is-sel");
        });
        /* Check action: select all files (toggles off when all selected). */
        var trayActs = document.querySelectorAll(".dmk__tray-act");
        trayActs[0].addEventListener("click", function (e) {
          e.stopPropagation();
          var tiles = trayFiles.querySelectorAll(".dmk__tfile:not(.is-out)");
          var allSelected = Array.prototype.every.call(tiles, function (t) { return t.classList.contains("is-sel"); });
          Array.prototype.forEach.call(tiles, function (t, i) {
            window.setTimeout(function () { t.classList.toggle("is-sel", !allSelected); }, allSelected ? 0 : 40 * i);
          });
        });
        var trayDrop = document.getElementById("dmk-tray-drop");
        trayDrop.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
        trayDrop.addEventListener("click", function (e) {
          e.stopPropagation();
          notch.classList.add("is-filled");
          spawnTrayFiles();
        });

        /* Widgets row: real droplets, force-pressable, drag scrollable. */
        var WIDGETS = [
          { n: "Weather", i: "/assets/mock/w-weather.webp" },
          { n: "Notifications", i: "/assets/mock/w-notifications.webp" },
          { n: "Voice Transcribe", i: "/assets/mock/w-voice-transcribe.webp" },
          { n: "High Alert", i: "/assets/mock/w-high-alert.webp" },
          { n: "TermiNotch", i: "/assets/mock/w-termi-notch.webp" },
          { n: "Pomodoro", i: "/assets/mock/w-pomodoro.webp" },
          { n: "Calendar", i: "/assets/mock/w-reminders.webp" },
          { n: "Thunderstorm", i: "/assets/mock/w-thunderstorm.webp" },
          { n: "Lyrics", i: "/assets/mock/w-lyrics.webp" }
        ];
        var widgetsRow = document.getElementById("dmk-widgets-row");
        WIDGETS.forEach(function (w) {
          var el = document.createElement("div");
          el.className = "dmk__widget";
          el.innerHTML = '<img src="' + w.i + '" alt="" loading="lazy"><span>' + w.n + "</span>";
          el.addEventListener("pointerdown", function (e) { e.stopPropagation(); el.classList.add("is-forced"); });
          ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
            el.addEventListener(ev, function () { el.classList.remove("is-forced"); });
          });
          widgetsRow.appendChild(el);
        });
        /* Calendar: July 2026 grid + agenda, 1:1 with the ToDo droplet.  */
        /* Dates focus their agenda section; task rings complete and the  */
        /* row blurs away.                                                 */
        (function () {
          var grid = document.getElementById("dmk-cal-grid");
          var agenda = document.getElementById("dmk-cal-agenda");
          if (!grid || !agenda) return;
          var checkImg = '<img src="/assets/mock/icon-sf-check.webp" alt="">';
          var COLORS = {
            purple: { c: "#bf5af2", t: "rgba(191,90,242,0.16)" },
            green: { c: "#30d158", t: "rgba(48,209,88,0.16)" },
            blue: { c: "#0A84FF", t: "rgba(10,132,255,0.16)" }
          };
          var SECTIONS = [
            { day: 10, label: "TODAY (WK. 28)", items: [
              { task: "test taak", ring: "#ff9f0a" },
              { event: "Padel met Bram", time: "18:00", color: "purple" }
            ] },
            { day: 11, label: "SATURDAY, 11 JUL (WK. 28)", items: [
              { event: "Brunch bij mama", time: "11:00", color: "green" }
            ] },
            { day: 12, label: "SUNDAY, 12 JUL (WK. 28)", items: [
              { task: "Amber Djojosemito\u2019s 27th Birthd\u2026", ring: "#5e7d9a" },
              { event: "Verjaardag Leanne", time: "14:00", color: "purple" }
            ] },
            { day: 13, label: "MONDAY, 13 JUL (WK. 29)", items: [
              { event: "Weekomzet delen Hesam", time: "10:00", color: "green" },
              { task: "Stripe payout checken", ring: "#ff9f0a" }
            ] },
            { day: 15, label: "WEDNESDAY, 15 JUL (WK. 29)", items: [
              { event: "Halo sync call", time: "09:30", color: "blue" }
            ] },
            { day: 16, label: "THURSDAY, 16 JUL (WK. 29)", items: [
              { event: "PCIE vergadering | Q4 2026", time: "15:00", color: "green" }
            ] },
            { day: 17, label: "FRIDAY, 17 JUL (WK. 29)", items: [
              { event: "Halo beta release", time: "13:00", color: "blue" }
            ] },
            { day: 18, label: "SATURDAY, 18 JUL (WK. 29)", items: [
              { event: "Festival Thuishaven", time: "14:00", color: "purple" }
            ] },
            { day: 20, label: "MONDAY, 20 JUL (WK. 30)", items: [
              { task: "Factuur PCIE sturen", ring: "#ff9f0a" }
            ] },
            { day: 22, label: "WEDNESDAY, 22 JUL (WK. 30)", items: [
              { event: "Etentje met Amber", time: "19:00", color: "purple" },
              { task: "Cadeau halen", ring: "#5e7d9a" }
            ] },
            { day: 24, label: "FRIDAY, 24 JUL (WK. 30)", items: [
              { task: "Auto APK inplannen", ring: "#ff9f0a" }
            ] },
            { day: 27, label: "MONDAY, 27 JUL (WK. 31)", items: [
              { event: "Q3 planning", time: "10:00", color: "green" }
            ] }
          ];

          /* Month grid: July 2026, weeks starting Monday. */
          ["M", "T", "W", "T", "F", "S", "S"].forEach(function (wd) {
            var el = document.createElement("span");
            el.className = "dmk__cal-wd";
            el.textContent = wd;
            grid.appendChild(el);
          });
          var CELLS = [];
          [[29, 30, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17, 18, 19],
           [20, 21, 22, 23, 24, 25, 26], [27, 28, 29, 30, 31, 1, 2], [3, 4, 5, 6, 7, 8, 9]]
            .forEach(function (week, w) {
              week.forEach(function (n, i) {
                var out = (w === 0 && n > 20) || (w >= 4 && n < 20 && !(w === 4 && n >= 20));
                var el = document.createElement("span");
                el.className = "dmk__cal-day" + (out ? " is-out" : "") + (i >= 5 ? " is-wknd" : "") +
                  (!out && n === 10 ? " is-today" : "");
                el.innerHTML = "<span>" + n + "</span>";
                if (!out) {
                  el.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
                  el.addEventListener("click", function (e) {
                    e.stopPropagation();
                    CELLS.forEach(function (c) { c.classList.remove("is-sel"); });
                    el.classList.add("is-sel");
                    var target = null;
                    for (var k = 0; k < SECTIONS.length; k++) {
                      if (SECTIONS[k].day >= n) { target = SECTIONS[k]; break; }
                    }
                    if (target && target.node) {
                      agenda.scrollTo({ top: Math.max(0, target.node.offsetTop - agenda.offsetTop - 2), behavior: "smooth" });
                    }
                  });
                  CELLS.push(el);
                }
                grid.appendChild(el);
              });
            });

          /* Agenda list. */
          function collapseAway(row, sec) {
            row.classList.add("is-away");
            var h = row.offsetHeight;
            row.style.height = h + "px";
            row.style.marginBottom = "5px";
            requestAnimationFrame(function () {
              row.style.transition = "opacity 320ms ease, filter 320ms ease, transform 360ms cubic-bezier(0.32,1.22,0.36,1), height 360ms cubic-bezier(0.32,1.22,0.36,1) 120ms, margin 360ms cubic-bezier(0.32,1.22,0.36,1) 120ms, padding 360ms cubic-bezier(0.32,1.22,0.36,1) 120ms";
              row.style.height = "0px";
              row.style.marginBottom = "0px";
              row.style.paddingTop = "0px";
              row.style.paddingBottom = "0px";
            });
            window.setTimeout(function () {
              row.remove();
              if (sec.node && !sec.rows.some(function (r) { return r.isConnected; })) {
                sec.node.style.transition = "opacity 260ms ease";
                sec.node.style.opacity = "0";
                window.setTimeout(function () { if (sec.node) { sec.node.remove(); sec.node = null; } }, 280);
              }
            }, 540);
          }

          function buildRow(it, sec) {
            var row = document.createElement("div");
            if (it.task) {
              row.className = "dmk__cal-row";
              row.style.setProperty("--ring-color", it.ring);
              row.innerHTML = '<span class="dmk__cal-ring">' + checkImg + '</span>' +
                '<span class="dmk__cal-row-meta"><span class="dmk__cal-row-title">' + it.task + "</span></span>";
              var ring = row.querySelector(".dmk__cal-ring");
              ring.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
              ring.addEventListener("click", function (e) {
                e.stopPropagation();
                if (row.classList.contains("is-done")) return;
                row.classList.add("is-done");
                window.setTimeout(function () { collapseAway(row, sec); }, 520);
              });
            } else {
              var col = COLORS[it.color];
              row.className = "dmk__cal-row dmk__cal-row--event";
              row.style.setProperty("--cal-color", col.c);
              row.style.setProperty("--cal-tint", col.t);
              row.innerHTML = '<span class="dmk__cal-row-meta"><span class="dmk__cal-row-title">' + it.event + '</span><span class="dmk__cal-row-time">' + it.time + "</span></span>";
            }
            sec.rows.push(row);
            return row;
          }

          SECTIONS.forEach(function (sec) {
            var head = document.createElement("div");
            head.className = "dmk__cal-sec";
            head.textContent = sec.label;
            agenda.appendChild(head);
            sec.node = head;
            sec.rows = [];
            sec.items.forEach(function (it) { agenda.appendChild(buildRow(it, sec)); });
          });
          agenda.addEventListener("pointerdown", function (e) { e.stopPropagation(); });

          /* Quick add: the + opens the glass popover; free text like     */
          /* "20:00 gym" or "overmorgen sporten" is parsed and planned    */
          /* into the agenda, in memory only.                              */
          var qadd = document.getElementById("dmk-qadd");
          var qaddInput = document.getElementById("dmk-qadd-input");
          var qaddBtn = document.getElementById("dmk-qadd-btn");
          var addBtn = document.querySelector(".dmk__cal-add");

          var WD = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
          function labelFor(d) {
            if (d === 10) return "TODAY (WK. 28)";
            var wd = WD[(((d - 6) % 7) + 7) % 7];
            var wk = 28 + Math.floor((d - 6) / 7);
            return wd + ", " + d + " JUL (WK. " + wk + ")";
          }
          function parseQuick(text) {
            var t = " " + text.trim() + " ";
            var day = 10, time = null;
            var m = t.match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/);
            if (m) { time = m[0]; t = t.replace(m[0], " "); }
            var words = [
              [/\bovermorgen\b/i, 12], [/\bmorgen\b/i, 11], [/\bvandaag\b/i, 10],
              [/\btomorrow\b/i, 11], [/\btoday\b/i, 10],
              [/\bmaandag\b|\bmonday\b/i, 13], [/\bdinsdag\b|\btuesday\b/i, 14],
              [/\bwoensdag\b|\bwednesday\b/i, 15], [/\bdonderdag\b|\bthursday\b/i, 16],
              [/\bvrijdag\b|\bfriday\b/i, 17], [/\bzaterdag\b|\bsaturday\b/i, 11],
              [/\bzondag\b|\bsunday\b/i, 12]
            ];
            for (var i = 0; i < words.length; i++) {
              if (words[i][0].test(t)) { day = words[i][1]; t = t.replace(words[i][0], " "); break; }
            }
            var dm = t.match(/\b(\d{1,2})\s*(?:juli|july|jul)\b/i);
            if (dm) { day = Math.min(31, Math.max(1, parseInt(dm[1], 10))); t = t.replace(dm[0], " "); }
            var title = t.replace(/\b(om|at|op|on)\b/gi, " ").replace(/\s+/g, " ").trim();
            if (title) title = title.charAt(0).toUpperCase() + title.slice(1);
            return { day: day, time: time, title: title };
          }
          function insertQuick(p) {
            var idx = -1, sec = null;
            for (var i = 0; i < SECTIONS.length; i++) {
              if (SECTIONS[i].day === p.day) { idx = i; sec = SECTIONS[i]; break; }
              if (SECTIONS[i].day > p.day) { idx = i; break; }
            }
            if (!sec) {
              sec = { day: p.day, label: labelFor(p.day), items: [], rows: [] };
              var head = document.createElement("div");
              head.className = "dmk__cal-sec";
              head.textContent = sec.label;
              sec.node = head;
              var beforeNode = null;
              for (var j = (idx < 0 ? SECTIONS.length : idx); j < SECTIONS.length; j++) {
                if (SECTIONS[j].node && SECTIONS[j].node.isConnected) { beforeNode = SECTIONS[j].node; break; }
              }
              agenda.insertBefore(head, beforeNode);
              if (idx < 0) SECTIONS.push(sec); else SECTIONS.splice(idx, 0, sec);
            } else if (!sec.node || !sec.node.isConnected) {
              var head2 = document.createElement("div");
              head2.className = "dmk__cal-sec";
              head2.textContent = sec.label;
              sec.node = head2;
              var before2 = null;
              for (var k = idx + 1; k < SECTIONS.length; k++) {
                if (SECTIONS[k].node && SECTIONS[k].node.isConnected) { before2 = SECTIONS[k].node; break; }
              }
              agenda.insertBefore(head2, before2);
            }
            var item = p.time
              ? { event: p.title, time: p.time, color: "blue" }
              : { task: p.title, ring: "#ff9f0a" };
            var row = buildRow(item, sec);
            row.classList.add("is-away");
            var last = null;
            sec.rows.forEach(function (r) { if (r !== row && r.isConnected) last = r; });
            var anchor = last ? last.nextSibling : sec.node.nextSibling;
            agenda.insertBefore(row, anchor);
            requestAnimationFrame(function () {
              row.classList.remove("is-away");
              agenda.scrollTo({ top: Math.max(0, row.offsetTop - agenda.offsetTop - 30), behavior: "smooth" });
            });
          }
          function closeQadd() { qadd.classList.remove("is-open"); }
          function submitQadd() {
            var p = parseQuick(qaddInput.value);
            if (!p.title) return;
            insertQuick(p);
            qaddInput.value = "";
            qadd.classList.remove("has-text");
            closeQadd();
          }
          addBtn.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
          addBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            qadd.classList.toggle("is-open");
            if (qadd.classList.contains("is-open")) qaddInput.focus({ preventScroll: true });
          });
          qadd.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
          qadd.addEventListener("click", function (e) { e.stopPropagation(); });
          qaddInput.addEventListener("keydown", function (e) {
            e.stopPropagation();
            if (e.key === "Enter") submitQadd();
            if (e.key === "Escape") closeQadd();
          });
          qaddInput.addEventListener("input", function () {
            qadd.classList.toggle("has-text", qaddInput.value.trim().length > 0);
          });
          qaddBtn.addEventListener("click", function (e) { e.stopPropagation(); submitQadd(); });
          document.addEventListener("pointerdown", function (e) {
            if (qadd.classList.contains("is-open") && !qadd.contains(e.target) && !addBtn.contains(e.target)) closeQadd();
          });
        })();

        var widgetsPane = document.querySelector(".dmk__widgets");
        function syncWidgetEdges() {
          widgetsPane.classList.toggle("can-left", widgetsRow.scrollLeft > 4);
          widgetsPane.classList.toggle("can-right", widgetsRow.scrollLeft < widgetsRow.scrollWidth - widgetsRow.clientWidth - 4);
        }
        widgetsRow.addEventListener("scroll", syncWidgetEdges, { passive: true });
        window.setTimeout(syncWidgetEdges, 600);
        var wDrag = false, wStartX = 0, wStartScroll = 0;
        widgetsRow.addEventListener("pointerdown", function (e) {
          wDrag = true;
          wStartX = e.clientX;
          wStartScroll = widgetsRow.scrollLeft;
        });
        widgetsRow.addEventListener("pointermove", function (e) {
          if (wDrag) widgetsRow.scrollLeft = wStartScroll - (e.clientX - wStartX);
        });
        ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
          widgetsRow.addEventListener(ev, function () { wDrag = false; });
        });
        var laneCircle = document.querySelector(".dmk__lane-circle");
        if (laneCircle) {
          laneCircle.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
          laneCircle.addEventListener("click", function (e) {
            e.stopPropagation();
            if (!notch.classList.contains("is-open")) return;
            notch.classList.remove("is-tray", "is-widgets", "is-queue", "is-out");
            document.getElementById("dmk-queue-btn").classList.remove("is-active");
            document.getElementById("dmk-out-btn").classList.remove("is-active");
            Array.prototype.forEach.call(laneSegs, function (x) { x.classList.remove("is-active"); });
            syncLaneInd();
            laneCircle.classList.add("is-active");
            notch.classList.add("is-cal");
          });
        }

        /* Mini art: hover peeks the track info, press responds live. */
        var miniArt = document.getElementById("dmk-mini-art");
        if (miniArt) {
          miniArt.addEventListener("pointerenter", function () {
            if (notch.classList.contains("is-mini")) notch.classList.add("is-peek");
          });
          notch.addEventListener("pointerleave", function () { notch.classList.remove("is-peek"); });
          miniArt.addEventListener("pointerdown", function () { miniArt.classList.add("is-forced"); });
          ["pointerup", "pointercancel"].forEach(function (ev) {
            miniArt.addEventListener(ev, function () { miniArt.classList.remove("is-forced"); });
          });
        }

        var art = document.getElementById("dmk-art");
        if (art) {
          art.addEventListener("pointerdown", function (e) { e.stopPropagation(); art.classList.add("is-forced"); });
          ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
            art.addEventListener(ev, function () { art.classList.remove("is-forced"); });
          });
        }

        /* Clip strip gesture: horizontal swipe scrolls the row; lifting a  */
        /* card upward starts a drag toward the notch, which reveals the    */
        /* quick actions and takes the drop.                                 */
        var dragging = false, gestureMode = null, startX = 0, startY = 0, startScroll = 0;
        var liftCard = null, liftGhost = null, liftBadge = null, liftOffX = 0, liftOffY = 0;
        var GHOST_SCALE = 0.82;
        var qaPane = document.getElementById("dmk-qa");
        var qaTiles = qaPane.querySelectorAll(".dmk__qa-tile");
        var QA_STATES = ["is-mini", "is-open", "is-peek", "is-tray", "is-widgets", "is-queue", "is-out", "is-cloud", "is-cloudx", "is-cal", "is-cv", "is-cvgo", "is-cvmini", "is-shud"];
        var qaPrev = null;

        function qaOpen() {
          dismissHint();
          if (qaPrev) return;
          /* A drag can start while a cloud upload HUD is mid-flight; kill
             its timers and shed its classes so they are never captured
             as a restore target. */
          cloudFlowId++;
          convFlowId++;
          if (cloudPane) cloudPane.classList.remove("is-done");
          if (convPane) convPane.classList.remove("is-done");
          notch.classList.remove("is-cloud", "is-cloudx", "is-cv", "is-cvgo", "is-cvmini", "is-shud");
          qaPrev = QA_STATES.filter(function (c) { return notch.classList.contains(c); });
          QA_STATES.forEach(function (c) { notch.classList.remove(c); });
          notch.classList.add("is-qa");
        }
        function qaClose(restore) {
          if (!qaPrev) return;
          notch.classList.remove("is-qa");
          if (restore) qaPrev.forEach(function (c) { notch.classList.add(c); });
          qaPrev = null;
          Array.prototype.forEach.call(qaTiles, function (t) { t.classList.remove("is-hov"); });
        }
        function beginLift(e) {
          var r = liftCard.getBoundingClientRect();
          liftOffX = e.clientX - r.left;
          liftOffY = e.clientY - r.top;
          liftGhost = liftCard.cloneNode(true);
          liftGhost.classList.remove("is-selected");
          liftGhost.classList.add("dmk__dragghost");
          /* Inline wins over .dmk__card's own position/flex rules. */
          liftGhost.style.position = "fixed";
          liftGhost.style.zIndex = "400";
          liftGhost.style.margin = "0";
          liftGhost.style.pointerEvents = "none";
          liftGhost.style.width = r.width + "px";
          liftGhost.style.height = r.height + "px";
          liftGhost.style.flex = "0 0 auto";
          liftGhost.style.transform = "scale(" + GHOST_SCALE + ")";
          liftBadge = document.createElement("span");
          liftBadge.className = "dmk__dragbadge";
          liftBadge.textContent = "+";
          document.body.appendChild(liftGhost);
          document.body.appendChild(liftBadge);
          qaOpen();
          moveLift(e);
        }
        function moveLift(e) {
          liftGhost.style.left = (e.clientX - liftOffX * GHOST_SCALE) + "px";
          liftGhost.style.top = (e.clientY - liftOffY * GHOST_SCALE) + "px";
          liftBadge.style.left = (e.clientX + 7) + "px";
          liftBadge.style.top = (e.clientY + 15) + "px";
          var hit = document.elementFromPoint(e.clientX, e.clientY);
          var tile = hit && hit.closest ? hit.closest(".dmk__qa-tile") : null;
          Array.prototype.forEach.call(qaTiles, function (t) { t.classList.toggle("is-hov", t === tile); });
        }
        /* Droppy Cloud upload: compact radar+ring HUD, ring fills, check  */
        /* lands, then the pill morphs into the wide success panel.        */
        var cloudPane = document.getElementById("dmk-cloud");
        var cloudRing = document.getElementById("dmk-cloud-ringfill");
        var cloudFlowId = 0;
        cloudPane.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
        cloudPane.addEventListener("pointerup", function (e) { e.stopPropagation(); });
        cloudPane.addEventListener("click", function (e) {
          e.stopPropagation();
          if (notch.classList.contains("is-cloudx")) window.droppyToast("Copied!", "success");
        });
        function runCloudFlow(c, restore) {
          var id = ++cloudFlowId;
          var live = function () { return id === cloudFlowId; };
          var hex = (((c.idx || 7) * 2654435761) >>> 0).toString(16).toUpperCase().slice(0, 8);
          var ext = c.kind === "Link" ? ".webloc" : (c.img ? ".png" : ".txt");
          var kindName = c.kind === "Link" ? "Link" : (c.img ? "Image" : "Text");
          document.getElementById("dmk-cloud-name").textContent = c.name || (kindName + "_" + hex + ext);
          var thumb = document.getElementById("dmk-cloud-thumb");
          thumb.classList.toggle("is-doc", !c.img);
          thumb.innerHTML = c.img ? '<img src="' + c.img + '" alt="">' : "";
          cloudPane.classList.remove("is-done");
          cloudRing.style.transition = "none";
          cloudRing.style.strokeDashoffset = "38";
          notch.classList.add("is-cloud");
          window.setTimeout(function () {
            if (!live()) return;
            cloudRing.style.transition = "";
            cloudRing.style.strokeDashoffset = "0";
          }, 60);
          window.setTimeout(function () { if (live()) cloudPane.classList.add("is-done"); }, 2050);
          window.setTimeout(function () { if (live()) notch.classList.add("is-cloudx"); }, 2650);
          window.setTimeout(function () { if (live()) notch.classList.remove("is-cloudx"); }, 6100);
          window.setTimeout(function () {
            if (!live()) return;
            notch.classList.remove("is-cloud");
            cloudPane.classList.remove("is-done");
            restore.forEach(function (cl) { notch.classList.add(cl); });
          }, 6500);
        }

        /* Convert flow: options sheet -> converting panel with progress   */
        /* ring -> glow-pop result -> compact done HUD -> restore.          */
        var convPane = document.getElementById("dmk-conv");
        var convRing = document.getElementById("dmk-conv-ring");
        var convOpts = document.getElementById("dmk-conv-opts");
        var convFlowId = 0;
        var CONV_FORMATS = {
          Image: ["PNG", "WEBP", "HEIC", "PDF", "TIFF"],
          Video: ["MP4", "GIF", "WEBM", "M4A", "MKV"],
          PDF: ["DOCX", "JPG", "PNG", "TXT", "EPUB"],
          Archive: ["TAR", "7Z", "GZ", "RAR", "ISO"],
          Text: ["PDF", "TXT", "MD", "DOCX", "RTF"]
        };
        var DOC_FORMATS = ["PDF", "DOCX", "TXT", "MD", "RTF", "EPUB", "TAR", "7Z", "GZ", "RAR", "ISO", "M4A", "MKV", "WEBM", "MP4", "GIF"];
        var convActiveRestore = null;
        convPane.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
        convPane.addEventListener("pointerup", function (e) { e.stopPropagation(); });
        convPane.addEventListener("click", function (e) {
          e.stopPropagation();
          if (!notch.classList.contains("is-cvmini")) return;
          convFlowId++;
          notch.classList.remove("is-cvmini");
          convPane.classList.remove("is-done");
          if (convActiveRestore) { convActiveRestore.forEach(function (cl) { notch.classList.add(cl); }); convActiveRestore = null; }
        });
        function convKind(c) {
          if (c.kind && CONV_FORMATS[c.kind]) return c.kind;
          if (c.img) return "Image";
          return "Text";
        }
        function convBaseName(c) {
          var n = c.name || (c.kind === "Link" ? "Link.webloc" : c.img ? "Image.png" : "Text.txt");
          return n;
        }
        function runConvertFlow(c, restore) {
          var id = ++convFlowId;
          var live = function () { return id === convFlowId; };
          convActiveRestore = restore;
          var name = convBaseName(c);
          var thumb = document.getElementById("dmk-conv-thumb");
          var title = document.getElementById("dmk-conv-title");
          var nameNode = document.getElementById("dmk-conv-name");
          convPane.classList.remove("is-done");
          thumb.classList.remove("is-popped");
          thumb.classList.toggle("is-doc", !c.img);
          thumb.innerHTML = c.img ? '<img src="' + c.img + '" alt="">' : "";
          title.textContent = "Convert";
          nameNode.textContent = name;
          convRing.style.transition = "none";
          convRing.style.strokeDashoffset = "92";
          convOpts.innerHTML = "";
          CONV_FORMATS[convKind(c)].forEach(function (fmt) {
            var chip = document.createElement("span");
            chip.className = "dmk__conv-opt";
            chip.textContent = fmt;
            chip.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
            chip.addEventListener("click", function (e) {
              e.stopPropagation();
              if (!live() || notch.classList.contains("is-cvgo")) return;
              notch.classList.add("is-cvgo");
              title.textContent = "Converting to " + fmt;
              window.setTimeout(function () {
                if (!live()) return;
                convRing.style.transition = "";
                convRing.style.strokeDashoffset = "0";
              }, 380);
              window.setTimeout(function () {
                if (!live()) return;
                convPane.classList.add("is-done");
                title.textContent = "Converted to " + fmt;
                var newName = name.replace(/\.[A-Za-z0-9]+$/, "") + "." + fmt.toLowerCase();
                nameNode.textContent = newName;
                var IMG_FORMATS = ["PNG", "WEBP", "HEIC", "TIFF", "JPG", "GIF"];
                if (!(c.img && IMG_FORMATS.indexOf(fmt) !== -1)) {
                  thumb.classList.add("is-doc");
                  thumb.innerHTML = "";
                }
                thumb.classList.add("is-popped");
              }, 2750);
              window.setTimeout(function () {
                if (!live()) return;
                notch.classList.remove("is-cv", "is-cvgo");
                notch.classList.add("is-cvmini");
              }, 4500);
              window.setTimeout(function () {
                if (!live()) return;
                notch.classList.remove("is-cvmini");
                convPane.classList.remove("is-done");
                convActiveRestore = null;
                restore.forEach(function (cl) { notch.classList.add(cl); });
              }, 5900);
            });
            convOpts.appendChild(chip);
          });
          notch.classList.add("is-cv");
        }
        document.addEventListener("pointerdown", function (e) {
          /* Clicking away from an open options sheet cancels the convert. */
          if (notch.classList.contains("is-cv") && !notch.classList.contains("is-cvgo") && !notch.contains(e.target)) {
            var id = ++convFlowId;
            notch.classList.remove("is-cv");
            if (convRestore) { convRestore.forEach(function (cl) { notch.classList.add(cl); }); convRestore = null; }
          }
        });
        var convRestore = null;

        function endLift(e) {
          var hit = document.elementFromPoint(e.clientX, e.clientY);
          var tile = hit && hit.closest ? hit.closest(".dmk__qa-tile") : null;
          /* Hit test can miss during heavy frames; the hovered tile is    */
          /* just as authoritative.                                        */
          if (!tile) tile = document.querySelector(".dmk__qa-tile.is-hov");
          var qaChoice = qaPrev && tile ? tile.getAttribute("data-qa") : null;
          var dropped = qaChoice === "keep";
          if (liftGhost) { liftGhost.remove(); liftGhost = null; }
          if (liftBadge) { liftBadge.remove(); liftBadge = null; }
          if (qaChoice === "cloud") {
            var cardData = liftCard.__mock || {};
            var restoreStates = qaPrev.filter(function (cl) { return cl !== "is-cloud" && cl !== "is-cloudx"; });
            qaClose(false);
            runCloudFlow(cardData, restoreStates);
            liftCard = null;
            return;
          }
          if (qaChoice === "convert") {
            var convData = liftCard.__mock || {};
            var convStates = qaPrev.filter(function (cl) { return ["is-cv", "is-cvgo", "is-cvmini", "is-cloud", "is-cloudx"].indexOf(cl) === -1; });
            qaClose(false);
            convRestore = convStates;
            runConvertFlow(convData, convStates);
            liftCard = null;
            return;
          }
          if (dropped) {
            var c = liftCard.__mock || {};
            qaClose(false);
            notch.classList.add("is-open", "is-tray", "is-filled");
            Array.prototype.forEach.call(laneSegs, function (x) { x.classList.remove("is-active"); });
            document.getElementById("dmk-lane-tray").classList.add("is-active");
            requestAnimationFrame(syncLaneInd);
            spawnTrayFiles();
            var hex = ((c.idx || 7) * 43 % 255).toString(16).toUpperCase();
            makeTrayTile({
              name: c.name || ((c.kind === "Link" ? "Link" : c.kind === "Text" ? "Text" : c.kind === "WW" ? "WW" : "Image") + "_" + hex + "\u2026"),
              img: c.img || null,
              doc: !c.img
            }, 320);
            window.setTimeout(syncTrayCount, 340);
          } else {
            qaClose(true);
          }
          liftCard = null;
        }
        function cancelLift() {
          if (liftGhost) { liftGhost.remove(); liftGhost = null; }
          if (liftBadge) { liftBadge.remove(); liftBadge = null; }
          qaClose(true);
          liftCard = null;
        }

        /* Clipboard category tabs: one pill glides to the tapped tab;    */
        /* demo pinboards are empty and show the pin state.                */
        var clipRoot = document.querySelector(".dmk__clip");
        var clipTabs = document.querySelectorAll(".dmk__tab[data-tab]");
        var ctabInd = document.getElementById("dmk-ctab-ind");
        if (clipRoot) {
        function syncClipInd() {
          var active = document.querySelector(".dmk__tab.is-active");
          if (!active || !ctabInd) return;
          ctabInd.style.left = active.offsetLeft + "px";
          ctabInd.style.width = active.offsetWidth + "px";
        }
        window.setTimeout(syncClipInd, 500);
        var clipTabsEl = document.querySelector(".dmk__clip-tabs");
        if (window.ResizeObserver && clipTabsEl) new ResizeObserver(function () { syncClipInd(); }).observe(clipTabsEl);
        Array.prototype.forEach.call(clipTabs, function (tab) {
          tab.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
          tab.addEventListener("click", function (e) {
            e.stopPropagation();
            Array.prototype.forEach.call(clipTabs, function (t) { t.classList.remove("is-active"); });
            tab.classList.add("is-active");
            syncClipInd();
            var board = tab.getAttribute("data-tab");
            var any = false;
            Array.prototype.forEach.call(row.children, function (card) {
              var c = card.__mock;
              if (!c) return;
              var show = board === "clipboard" || c.board === board;
              card.style.display = show ? "" : "none";
              if (show && board !== "clipboard") any = true;
            });
            clipRoot.classList.toggle("is-board", board !== "clipboard" && !any);
          });
        });

        /* Search mode: the capsule morphs out of the circle button, takes */
        /* over the row, and morphs back into it on exit.                   */
        var clipSearchBtn = document.getElementById("dmk-clip-search-btn");
        var clipSearchInput = document.getElementById("dmk-clip-search-input");
        var clipSearchNode = document.getElementById("dmk-clip-search");
        var clipTabsRow = document.querySelector(".dmk__clip-tabs");
        function searchCircleLeft() {
          return clipTabsRow.offsetLeft + clipSearchBtn.offsetLeft;
        }
        function openClipSearch() {
          clipRoot.classList.remove("is-board");
          Array.prototype.forEach.call(clipTabs, function (t, i) { t.classList.toggle("is-active", i === 0); });
          syncClipInd();
          /* Start the capsule exactly on the circle, then let it stretch. */
          clipSearchNode.style.transition = "none";
          clipSearchNode.style.left = searchCircleLeft() + "px";
          clipSearchNode.style.width = "29px";
          clipSearchNode.style.padding = "0 8px";
          clipRoot.classList.add("is-search");
          clipSearchNode.offsetWidth;
          clipSearchNode.style.transition = "";
          var w = Math.min(430, clipRoot.clientWidth * 0.6);
          clipSearchNode.style.width = w + "px";
          clipSearchNode.style.left = ((clipRoot.clientWidth - w) / 2) + "px";
          clipSearchNode.style.padding = "0 12px";
          window.setTimeout(function () {
            if (!clipRoot.classList.contains("is-search")) return;
            clipRoot.classList.add("is-search-in");
            clipSearchInput.focus({ preventScroll: true });
          }, 300);
        }
        function exitClipSearch() {
          if (!clipRoot.classList.contains("is-search")) return;
          clipRoot.classList.remove("is-search-in");
          clipSearchInput.blur();
          clipSearchNode.style.left = searchCircleLeft() + "px";
          clipSearchNode.style.width = "29px";
          clipSearchNode.style.padding = "0 8px";
          window.setTimeout(function () {
            clipRoot.classList.remove("is-search");
            clipSearchInput.value = "";
            filterClipCards("");
          }, 430);
        }
        function filterClipCards(q) {
          q = q.trim().toLowerCase();
          Array.prototype.forEach.call(row.children, function (card) {
            var c = card.__mock;
            if (!c) return;
            var hay = (c.kind + " " + (c.body || "") + " " + (c.dims || "")).toLowerCase();
            card.style.display = !q || hay.indexOf(q) !== -1 ? "" : "none";
          });
        }
        clipSearchBtn.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
        clipSearchBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          if (clipRoot.classList.contains("is-search")) exitClipSearch(); else openClipSearch();
        });
        clipSearchInput.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
        clipSearchInput.addEventListener("keydown", function (e) {
          e.stopPropagation();
          if (e.key === "Escape") exitClipSearch();
        });
        clipSearchInput.addEventListener("input", function () { filterClipCards(clipSearchInput.value); });
        document.addEventListener("pointerdown", function (e) {
          if (clipRoot.classList.contains("is-search") && !clipRoot.contains(e.target)) exitClipSearch();
        });
        }

        /* Desktop icons: Windows-style select, folder easter egg, and drag  */
        /* any file into the notch through the same quick-actions flow.   */
        var deskIcons = document.querySelectorAll(".dmk__dicon");
        var DESK_DATA = {
          photo: { kind: "Image", img: "/assets/mock/desk-photo.webp", name: "Recap.png", idx: 21 },
          mov: { kind: "Video", name: "Sprint-cut.mp4", idx: 22 },
          pdf: { kind: "PDF", name: "Q3-brief.pdf", idx: 23 },
          zip: { kind: "Archive", name: "Assets.zip", idx: 24 }
        };
        function deselectDesk() {
          Array.prototype.forEach.call(deskIcons, function (i) { i.classList.remove("is-sel"); });
        }
        Array.prototype.forEach.call(deskIcons, function (icon) {
          var file = icon.getAttribute("data-file");
          var dDrag = false, dMode = null, dsx = 0, dsy = 0;
          icon.addEventListener("pointerdown", function (e) {
            e.stopPropagation();
            deselectDesk();
            icon.classList.add("is-sel");
            icon.classList.add("is-pressed");
            if (file === "folder") return;
            dDrag = true;
            dMode = null;
            dsx = e.clientX;
            dsy = e.clientY;
            liftCard = icon;
            icon.__mock = DESK_DATA[file];
            try { icon.setPointerCapture(e.pointerId); } catch (_) {}
          });
          icon.addEventListener("pointermove", function (e) {
            if (!dDrag) return;
            if (!dMode) {
              if (Math.hypot(e.clientX - dsx, e.clientY - dsy) < 6) return;
              dMode = "lift";
              icon.classList.remove("is-pressed");
              beginLift(e);
            } else {
              moveLift(e);
            }
          });
          function finishDesk(e, cancelled) {
            icon.classList.remove("is-pressed");
            if (dDrag && dMode === "lift") { if (cancelled) cancelLift(); else endLift(e); }
            dDrag = false;
            dMode = null;
          }
          icon.addEventListener("pointerup", function (e) { finishDesk(e, false); });
          icon.addEventListener("pointercancel", function (e) { finishDesk(e, true); });
          ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
            icon.addEventListener(ev, function () { icon.classList.remove("is-pressed"); });
          });
          if (file === "folder") {
            icon.addEventListener("click", function (e) {
              e.stopPropagation();
              window.droppyToast("Bro, what the heck?!", "neutral");
            });
          }
        });
        document.querySelector(".dmk__screen").addEventListener("pointerdown", function (e) {
          if (!e.target.closest || !e.target.closest(".dmk__dicon")) deselectDesk();
        });

        if (row) {
        row.addEventListener("pointerdown", function (e) {
          dragging = true;
          gestureMode = null;
          startX = e.clientX;
          startY = e.clientY;
          startScroll = row.scrollLeft;
          liftCard = e.target.closest ? e.target.closest(".dmk__card") : null;
          try { row.setPointerCapture(e.pointerId); } catch (_) {}
        });
        row.addEventListener("pointermove", function (e) {
          if (!dragging) return;
          var dx = e.clientX - startX, dy = e.clientY - startY;
          if (!gestureMode) {
            if (Math.abs(dx) < 7 && Math.abs(dy) < 7) return;
            if (liftCard && Math.abs(dy) > Math.abs(dx) && dy < 0) {
              gestureMode = "lift";
              beginLift(e);
            } else {
              gestureMode = "scroll";
              row.classList.add("is-dragging");
            }
          }
          if (gestureMode === "scroll") {
            row.scrollLeft = startScroll - (e.clientX - startX);
          } else {
            moveLift(e);
          }
        });
        function endDrag(e) {
          if (dragging && gestureMode === "lift") {
            endLift(e);
          } else if (dragging && e && Math.abs(e.clientX - startX) < 6) {
            /* A tap, not a swipe: move the selection ring smoothly. */
            var hit = document.elementFromPoint(e.clientX, e.clientY);
            var card = hit && hit.closest ? hit.closest(".dmk__card") : null;
            if (card) {
              var prev = row.querySelector(".dmk__card.is-selected");
              if (prev && prev !== card) prev.classList.remove("is-selected");
              card.classList.add("is-selected");
            }
          }
          dragging = false;
          gestureMode = null;
          row.classList.remove("is-dragging");
        }
        row.addEventListener("pointerup", endDrag);
        row.addEventListener("pointercancel", function () {
          if (gestureMode === "lift") cancelLift();
          dragging = false;
          gestureMode = null;
          row.classList.remove("is-dragging");
        });
        }

        /* Safety net: a lifted ghost must never outlive its gesture. If
           the browser swallows the pointer's end event (Safari capture
           loss, edge swipe, tab switch), the fixed-position ghost would
           stay pinned over the rest of the page. Page scroll, window
           blur, tab hide, or a stray pointer end all clean it up. */
        function liftSafetyClean() {
          if (!liftGhost) return;
          cancelLift();
          dragging = false;
          gestureMode = null;
          dDrag = false;
          dMode = null;
          if (row) row.classList.remove("is-dragging");
        }
        window.addEventListener("scroll", function () {
          if (liftGhost) liftSafetyClean();
        }, { passive: true });
        window.addEventListener("blur", liftSafetyClean);
        document.addEventListener("visibilitychange", function () {
          if (document.hidden) liftSafetyClean();
        });
        ["pointerup", "pointercancel"].forEach(function (ev) {
          window.addEventListener(ev, function () {
            if (liftGhost && !dragging && !dDrag) liftSafetyClean();
          }, true);
        });

        /* ------------------------------------------------------------ */
        /* Start demo!: a scripted autopilot tour through everything the */
        /* mock can do, driven through the same handlers a visitor uses. */
        /* ------------------------------------------------------------ */
        var demoToken = 0;
        var demoBtn = document.getElementById("dmk-demo-btn");
        function demoWait(ms) { return new Promise(function (res) { window.setTimeout(res, ms); }); }
        function demoCenter(el) {
          var r = el.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        }
        function demoReset() {
          if (qaPrev) qaClose(false);
          cloudFlowId++;
          convFlowId++;
          cloudPane.classList.remove("is-done");
          convPane.classList.remove("is-done");
          notch.classList.remove("is-qa", "is-cloud", "is-cloudx", "is-cv", "is-cvgo", "is-cvmini", "is-shud", "is-pressing");
          exitClipSearch();
          clipRoot.classList.remove("is-board");
          Array.prototype.forEach.call(clipTabs, function (t, i) { t.classList.toggle("is-active", i === 0); });
          syncClipInd();
          filterClipCards("");
          deselectDesk();
          var qaddNode = document.getElementById("dmk-qadd");
          if (qaddNode) qaddNode.classList.remove("is-open", "has-text");
          closeShelf();
        }
        async function demoDrag(fromEl, toElGetter, pid, dispatchTarget) {
          var tgt = dispatchTarget || fromEl;
          var a = demoCenter(fromEl);
          fromEl.dispatchEvent(new PointerEvent("pointerdown", { clientX: a.x, clientY: a.y, pointerId: pid, bubbles: true, composed: true }));
          /* Nudge to trigger the lift, let the quick actions unfold, then  */
          /* measure the real target position.                              */
          tgt.dispatchEvent(new PointerEvent("pointermove", { clientX: a.x, clientY: a.y - 14, pointerId: pid, bubbles: true, composed: true }));
          await demoWait(480);
          var b0 = demoCenter(toElGetter());
          var steps = 18;
          for (var i = 1; i <= steps; i++) {
            if (demoToken < 0) break;
            var t = i / steps;
            var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            tgt.dispatchEvent(new PointerEvent("pointermove", { clientX: a.x + (b0.x - a.x) * e, clientY: a.y + (b0.y - a.y) * e, pointerId: pid, bubbles: true, composed: true }));
            await demoWait(26);
          }
          await demoWait(160);
          var b = demoCenter(toElGetter());
          tgt.dispatchEvent(new PointerEvent("pointermove", { clientX: b.x, clientY: b.y, pointerId: pid, bubbles: true, composed: true }));
          await demoWait(180);
          tgt.dispatchEvent(new PointerEvent("pointerup", { clientX: b.x, clientY: b.y, pointerId: pid, bubbles: true, composed: true }));
        }
        async function demoType(input, text) {
          input.focus({ preventScroll: true });
          for (var i = 0; i < text.length; i++) {
            if (demoToken < 0) return;
            input.value = text.slice(0, i + 1);
            input.dispatchEvent(new Event("input", { bubbles: true }));
            await demoWait(72);
          }
        }
        var SHUD_KINDS = {
          brightness: { icon: "/assets/mock/icon-sf-sun.webp", label: "Display", color: "#FFD60A", track: "rgba(255,214,10,0.22)" },
          volume: { icon: "/assets/mock/icon-sf-speaker.webp", label: "Volume", color: "#32D74B", track: "rgba(50,215,75,0.22)" }
        };
        async function demoSystemHud(kind, from, to, myToken) {
          var k = SHUD_KINDS[kind];
          var pane = document.getElementById("dmk-shud");
          document.getElementById("dmk-shud-ic").src = k.icon;
          document.getElementById("dmk-shud-label").textContent = k.label;
          pane.style.setProperty("--hud-color", k.color);
          pane.style.setProperty("--hud-track", k.track);
          var fill = document.getElementById("dmk-shud-fill");
          var val = document.getElementById("dmk-shud-val");
          function setVal(v) {
            var str = String(v);
            if (val.children.length !== str.length) {
              val.innerHTML = "";
              for (var d = 0; d < str.length; d++) {
                var sp = document.createElement("span");
                sp.className = "dmk__shud-d";
                val.appendChild(sp);
              }
            }
            for (var d2 = 0; d2 < str.length; d2++) {
              var span = val.children[d2];
              if (span.textContent !== str[d2]) {
                span.textContent = str[d2];
                span.classList.add("is-tick");
                window.clearTimeout(span.__tick);
                span.__tick = window.setTimeout((function (el) { return function () { el.classList.remove("is-tick"); }; })(span), 150);
              }
            }
          }
          if (notch.classList.contains("is-shud")) {
            notch.classList.remove("is-shud");
            await demoWait(340);
          }
          fill.style.setProperty("width", from + "%");
          setVal(from);
          notch.classList.remove("is-mini");
          notch.classList.add("is-shud");
          await demoWait(480);
          var steps = 30;
          for (var i = 1; i <= steps; i++) {
            if (demoToken !== myToken) return;
            var t = i / steps;
            var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            var v = Math.round(from + (to - from) * e);
            fill.style.setProperty("width", v + "%");
            setVal(v);
            await demoWait(62);
          }
          val.classList.add("is-settle");
          window.setTimeout(function () { val.classList.remove("is-settle"); }, 420);
          await demoWait(750);
        }
        async function runDemo(myToken) {
          function alive() { return demoToken === myToken; }
          document.getElementById("droppy-mock").scrollIntoView({ behavior: "smooth", block: "center" });
          await demoWait(700);
          if (!alive()) return;

          /* 0. System HUDs: brightness up, then volume down. */
          await demoSystemHud("brightness", 32, 62, myToken);
          if (!alive()) return;
          await demoSystemHud("volume", 68, 43, myToken);
          if (!alive()) return;
          notch.classList.remove("is-shud");
          notch.classList.add("is-mini");
          await demoWait(750);
          if (!alive()) return;

          /* 1. Open the shelf with a real press. */
          notch.dispatchEvent(new PointerEvent("pointerdown", { pointerId: 90, bubbles: true }));
          await demoWait(190);
          notch.dispatchEvent(new PointerEvent("pointerup", { pointerId: 90, bubbles: true }));
          await demoWait(1100);
          if (!alive()) return;

          /* 2. Playing Next: open, promote a track, close. */
          document.getElementById("dmk-queue-btn").click();
          await demoWait(1100);
          var qrows = document.querySelectorAll(".dmk__qrow");
          if (qrows[2]) qrows[2].click();
          await demoWait(2100);
          if (!alive()) return;
          document.getElementById("dmk-queue-btn").click();
          await demoWait(950);
          if (!alive()) return;

          /* 3. Audio output: unfold, hand off to the HomePod, close. */
          document.getElementById("dmk-out-btn").click();
          await demoWait(1100);
          var rows2 = document.querySelectorAll(".dmk__orow");
          if (rows2[1]) rows2[1].querySelector(".dmk__orow-check").click();
          await demoWait(1600);
          if (!alive()) return;
          document.getElementById("dmk-out-btn").click();
          await demoWait(900);
          if (!alive()) return;

          /* 4. File tray: files land, pick two. */
          document.getElementById("dmk-lane-tray").click();
          await demoWait(1500);
          var thumbs = document.querySelectorAll(".dmk__tfile-thumb");
          if (thumbs[1]) thumbs[1].click();
          await demoWait(420);
          if (thumbs[3]) thumbs[3].click();
          await demoWait(900);
          if (!alive()) return;

          /* 5. Widgets: glide through the row. */
          laneSegs[2].click();
          await demoWait(900);
          widgetsRow.scrollTo({ left: 200, behavior: "smooth" });
          await demoWait(1100);
          widgetsRow.scrollTo({ left: 0, behavior: "smooth" });
          await demoWait(800);
          if (!alive()) return;

          /* 6. Calendar: focus a day, finish a task, quick-add by text. */
          laneCircle.click();
          await demoWait(1100);
          var d16 = Array.prototype.find.call(document.querySelectorAll(".dmk__cal-day:not(.is-out)"), function (d) { return d.textContent === "16"; });
          if (d16) d16.click();
          await demoWait(1100);
          var ring = document.querySelector(".dmk__cal-ring");
          if (ring) ring.click();
          await demoWait(1500);
          if (!alive()) return;
          document.querySelector(".dmk__cal-add").click();
          await demoWait(500);
          await demoType(document.getElementById("dmk-qadd-input"), "20:00 gym");
          await demoWait(420);
          if (!alive()) return;
          document.getElementById("dmk-qadd-btn").click();
          await demoWait(1500);
          if (!alive()) return;

          /* 7. Tuck the shelf away. */
          closeShelf();
          await demoWait(900);
          if (!alive()) return;

          /* 8. Drag the recap image onto Keep. */
          var photoIcon = document.querySelector('.dmk__dicon[data-file="photo"]');
          await demoDrag(photoIcon, function () {
            return document.querySelector('.dmk__qa-tile[data-qa="keep"]');
          }, 91);
          await demoWait(1700);
          if (!alive()) return;
          closeShelf();
          await demoWait(800);
          if (!alive()) return;

          /* 9. Convert the brief to PNG. */
          var pdfIcon = document.querySelector('.dmk__dicon[data-file="pdf"]');
          await demoDrag(pdfIcon, function () {
            return document.querySelector('.dmk__qa-tile[data-qa="convert"]');
          }, 93);
          await demoWait(900);
          var png = Array.prototype.find.call(document.querySelectorAll(".dmk__conv-opt"), function (o) { return o.textContent === "PNG"; });
          if (png) png.click();
          await demoWait(6600);
          if (!alive()) return;

          /* 12. Curtain call. */
          var folder = document.querySelector('.dmk__dicon[data-file="folder"]');
          folder.dispatchEvent(new PointerEvent("pointerdown", { pointerId: 94, bubbles: true }));
          folder.click();
          await demoWait(600);
          deselectDesk();
          if (demoToken === myToken) {
            demoBtn.textContent = "Start demo!";
            demoToken++;
          }
        }
        if (demoBtn) {
          demoBtn.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
          demoBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (demoBtn.textContent === "Stop demo") {
              demoToken++;
              demoReset();
              demoBtn.textContent = "Start demo!";
              return;
            }
            demoReset();
            demoBtn.textContent = "Stop demo";
            runDemo(++demoToken);
          });
        }
      
  if (document.getElementById("droppy-mock") && document.getElementById("dmk-notch")) {
    document.documentElement.setAttribute("data-dmk-ready", "1");
  }
}
