let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs { };
  yarn = pkgs.yarn.override { nodejs = pkgs.nodejs-16_x; };
in pkgs.mkShell {
  name = "blog";
  buildInputs = with pkgs; [ nodejs-16_x yarn ];

  shellHook = ''
    ${yarn}/bin/yarn install
  '';
}
