from pathlib import Path

html_path = Path(r"E:\code\Github\Halo web\components\marketing\droppy\droppy-mock.html")
text = html_path.read_text(encoding="utf-8")

start = text.index('          <div class="dmk__desk"')
mid = text.index('              <div class="dmk__hint')
# keep from hint onward until clip
clip = text.index('              <div class="dmk__clip"')
end = text.index("            </div>\n          </div>", clip)

desk = '''          <div class="dmk__desk" aria-hidden="true" id="dmk-desk">
            <div class="dmk__dicon" data-file="folder"><span class="dmk__dicon-img"><img src="/assets/mock/icon-dfolder.webp" alt=""></span><span class="dmk__dicon-label">Projects</span></div>
            <div class="dmk__dicon dmk__dicon--thumb" data-file="photo"><span class="dmk__dicon-img"><img src="/assets/mock/desk-photo.webp" alt=""></span><span class="dmk__dicon-label">Recap.png</span></div>
            <div class="dmk__dicon" data-file="mov"><span class="dmk__dicon-img"><img src="/assets/mock/icon-dmov.webp" alt=""></span><span class="dmk__dicon-label">Sprint-cut.mp4</span></div>
            <div class="dmk__dicon" data-file="pdf"><span class="dmk__dicon-img"><img src="/assets/mock/icon-dpdf.webp" alt=""></span><span class="dmk__dicon-label">Q3-brief.pdf</span></div>
            <div class="dmk__dicon" data-file="zip"><span class="dmk__dicon-img"><img src="/assets/mock/icon-dzip.webp" alt=""></span><span class="dmk__dicon-label">Assets.zip</span></div>
          </div>
              <button type="button" class="dmk__demo" id="dmk-demo-btn">Start demo</button>
'''

taskbar = '''              <div class="dmk__taskbar" aria-hidden="true">
                <div class="dmk__tb-center">
                  <span class="dmk__tb-btn dmk__tb-start" title="Start"><img src="/windows-svg.svg" alt=""></span>
                  <span class="dmk__tb-btn" title="Search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="6.5"></circle><line x1="16" y1="16" x2="20.5" y2="20.5"></line></svg></span>
                  <span class="dmk__tb-btn" title="Task view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="8" height="14" rx="1.5"></rect><rect x="13" y="5" width="8" height="14" rx="1.5"></rect></svg></span>
                  <span class="dmk__tb-app is-open" title="File Explorer"><img src="/assets/mock/icon-dfolder.webp" alt=""></span>
                  <span class="dmk__tb-app" title="Edge"><img src="/assets/mock/icon-chrome.webp" alt=""></span>
                  <span class="dmk__tb-app" title="Spotify"><img src="/assets/mock/icon-app-spotify.webp" alt=""></span>
                </div>
                <div class="dmk__tb-tray">
                  <svg class="dmk__mb-ic dmk__mb-ic--wifi" viewBox="0 2.8 24 24" fill="currentColor"><path d="M12 18.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM12 13c-2 0-3.9.8-5.3 2.1l1.7 1.8A5.1 5.1 0 0 1 12 15.6c1.4 0 2.7.5 3.6 1.3l1.7-1.8A7.6 7.6 0 0 0 12 13zm0-5.4c-3.5 0-6.7 1.4-9 3.6l1.7 1.8A10.4 10.4 0 0 1 12 10.2c2.8 0 5.4 1.1 7.3 2.8l1.7-1.8a12.9 12.9 0 0 0-9-3.6z"></path></svg>
                  <span class="dmk__clock">3:34 PM</span>
                </div>
              </div>
'''

head = text[:start]
middle = text[mid:clip]
tail = text[end:]
out = head + desk + middle + taskbar + tail
out = out.replace('Open the Droppy media player', 'Open the Halo media player')
out = out.replace('Droppy Cloud', 'OneDrive')
out = out.replace('AirDrop', 'Share')
out = out.replace('MacBook Pro Speakers', 'Speakers')
out = out.replace('Living Room', 'Headphones')
out = out.replace('>WW_308…<', '>Brief.docx<')
out = out.replace('>Image_29…<', '>Cover.png<')
out = out.replace('>Image_B0…<', '>Notes.png<')
out = out.replace('>Image_C0…<', '>Timer.png<')
out = out.replace('>Image_D4…<', '>Reply.png<')
html_path.write_text(out, encoding="utf-8")
print("html written", html_path.stat().st_size, "clip gone", ".dmk__clip" not in out, "menubar gone", "dmk__menubar" not in out)
