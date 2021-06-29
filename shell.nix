let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs { };
in pkgs.mkShell {
  name = "blog";
  buildInputs = with pkgs; [ nodejs yarn ];
}
