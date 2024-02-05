# Open Policy Agent (OPA) Policy Check Action

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

A GitHub action that validates the policy using OPA.

## Usage

### Example workflow

This example checks policy using Open Policy Agent (OPA).

```yaml
name: Policy validation using OPA
on: [ push, pull_request ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@latest
      - name: Check policy using Open Policy Agent (OPA)
        uses: opsverse/opa-policy-check@0.1.0
        with:
          opaServerUrl: "https://opa.example.com"
          opaServerAuthToken: ${{ secrets.OPA_SERVER_AUTH_TOKEN }}
          opaServerInput: '{"input": null}'
          opaServerPackageName: "example/include" # Package name to be given using `/` as the delimiter instead of `.`. For instance package `example.include` should be given as `example/include`
```

NOTE: Following is a simple policy in the OPA server.

`include.rego`:
```
package example.include
    allow := false
```

### Inputs

| Input                    | Description                                                                        |
|--------------------------|------------------------------------------------------------------------------------|
| `opaServerUrl`           | Open Policy Agent (OPA) Server address (with protocol)                             |
| `opaServerAuthToken`     | Open Policy Agent (OPA) Auth token                                                 |
| `opaServerInput`         | Open Policy Agent (OPA) input                                                      |
| `opaServerPackageName`   | Open Policy Agent (OPA) package name from which the server should fetch the policy |

## Examples

### Check policy using Open Policy Agent (OPA)

You can check the policy using Open Policy Agent (OPA).

```yaml
name: Policy validation using OPA
on: [ push, pull_request ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@latest
      - name: Check policy using Open Policy Agent (OPA)
        uses: opsverse/opa-policy-check@0.1.0
        with:
          opaServerUrl: "https://opa.example.com"
          opaServerAuthToken: ${{ secrets.OPA_SERVER_AUTH_TOKEN }}
          opaServerInput: '{"input": null}'
          opaServerPackageName: "example/include" # Package name to be given using `/` as the delimiter instead of `.`. For instance package `example.include` should be given as `example/include`
```

NOTE: Following is a simple policy in the OPA server.

`include.rego`:
```
package example.include
    allow := false
```
