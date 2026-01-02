#!/bin/bash
aws cloudfront list-distributions --profile z3r0 --output json | grep -B 10 "gregorywilsonjr.com" | grep "Id"
