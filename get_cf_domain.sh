#!/bin/bash
aws cloudfront list-distributions --profile z3r0 --output json | grep -A 5 "DomainName"
