# ❌ Errors & Fixes

## 1. Address already in use (8080)

Cause:

* Previous backend running

Fix:

```bash
kill -9 <pid>
```

---

## 2. Unable to fetch models

Cause:

* Wrong Ollama URL

Fix:

```
Use: http://ollama:11434 (Docker network)
```

---

## 3. host.docker.internal not working (Linux)

Fix:

```bash
--network openwebui-net
```

---

## 4. ENOSPC (file watchers)

Fix:

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## 5. pyaudioop missing

Cause:

* Python version mismatch

Fix:

* Use Python 3.11 instead of 3.13

---

## 6. Docker install failed (Kali)

Cause:

* Wrong repo

Fix:

```bash
curl -fsSL https://get.docker.com | sudo sh
```

---

## 7. Login not working

Fix:

```bash
rm backend/data/webui.db
```

