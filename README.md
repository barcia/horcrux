# Horcrux

Horcrux is a command-line tool for encrypting and splitting files into multiple parts, known as horcruxes. The horcruxes can be distributed to different locations to ensure the security of the data. The tool also allows for restoring the original files from all required horcruxes.

## Installation

To install Horcrux, make sure you have Deno installed on your system. Then, run the following command in your terminal:

```
deno install --allow-read --allow-write --allow-env --unstable https://deno.land/x/horcrux/mod.ts
```


This will install Horcrux on your system and allow you to run it from anywhere in your terminal.

You can also doenload the [last release](https://github.com/barcia/horcrux/releases) binary

## Usage

To use Horcrux, run the following command in your terminal:

`horcrux [command] [options]`


Where `[command]` is one of the following:

- `create`: Encrypts and splits a file into horcruxes.
- `restore`: Restores an original file from the horcruxes.
- `version`: Shows the current version of Horcrux.

And `[options]` are the specific options for each command. The available options are:

### `create` command

- `--input`, `-i`: The input file to encrypt and split. Required.
- `--output`, `-o`: The output directory to save the horcruxes. Defaults to the current directory.
- `--parts`, `-p`: The number of horcruxes to create. Defaults to 5.
- `--threshold`, `-t`: The minimum number of horcruxes required to restore the original file. Defaults to 3.

Example:

```
horcrux create --input secret-file.txt --output horcruxes --parts 7 --threshold 4
```


This will encrypt and split the file `secret-file.txt` into 7 horcruxes, saving them in the directory `horcruxes`. To restore the original file, at least 4 horcruxes will be required.

### `restore` command

- `--input`, `-i`: The horcruxes to use to restore the original file. Required.
- `--output`, `-o`: The output file to save the restored file. Required.

Example:

```
horcrux restore --input horcrux-1.txt horcrux-2.txt horcrux-3.txt --output restored-file.txt
```


This will restore the original file from the horcruxes `horcrux-1.txt`, `horcrux-2.txt`, and `horcrux-3.txt`, saving it as `restored-file.txt`.

### `version` command

This command takes no options.

Example:
`horcrux version`


This will show the current version of Horcrux.

## Examples

Here are some more examples of how you can use Horcrux:

- Encrypt and split a file into 5 horcruxes:

horcrux create --input secret-file.txt --parts 5 --threshold 3

- Restore an original file from 3 horcruxes:

horcrux restore --input horcrux-1.txt horcrux-2.txt horcrux-3.txt --output restored-file.txt
- Show the current version of Horcrux:
horcrux version


## Contributing

If you would like to contribute to Horcrux, we are open to your contributions! Simply fork the repository, make your changes, and submit a pull request. Make sure to follow the contribution guidelines and to test your changes before submitting them.

## License

Horcrux is available under the MIT License. See the LICENSE file for more information.