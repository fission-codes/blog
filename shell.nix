let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs { };
in pkgs.mkShell {
  name = "blog";
  buildInputs = with pkgs; [ nodejs-16_x ];

  shellHook = ''
    ${pkgs.nodejs-16_x}/bin/npm install
  '';
}
