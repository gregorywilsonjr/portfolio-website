#!/bin/bash
aws cloudfront list-distributions --profile z3r0 --query 'DistributionList.Items[0]' --output json
