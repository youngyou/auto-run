# auto-run-script

A cli tool to run npm-scripts or script by platform.

## Why
   
Sometimes, we need to run different script for different platform.
Such as:

```json
{
    "scripts": {
        "echo:win32": "echo \"run win script\"",
        "echo:linux": "echo \"run linux script\"",
        "echo:darwin": "echo \"run darwin script\""
    }
}
```
* **Before**: you should run `npm run echo:win32` or `npm run echo:linux`

* **With this**: just run `auto-run-script echo:*`

## Usage

```shell
auto-run-script [script] [OPTIONS]

run the script(or name) by platform

Options:
  --version               Show version number           [boolean]
  --win32, -w, --windows  script or name for windows    [string]
  --darwin, -m, --mac     script or name for mac        [string]
  --linux, -l             script or name for linux      [string]
  --help, -h              Show help                     [boolean]
```