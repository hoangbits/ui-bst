import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToastrService } from 'ngx-toastr';

import { Company } from './index';
import { CompanyService } from './company.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertDialog } from '../dialog/alert.dialog.component';
import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'company-modal-content',
  templateUrl: './company.modal.add.html',
  styleUrls: ['./company.modal.add.css'],
  providers: [CompanyService]
})
export class CompanyModalAddComponent implements OnInit {
  title: string;
  errorMsg: string;
  isSubmited: boolean;
  fg: FormGroup;

  constructor(public bsModalRef: BsModalRef,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService) {
    this.createForm();
    this.getCountries();
  }

  ngOnInit() {
  }

  createForm() {
    this.fg = this.fb.group({
      companyName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      taxCode: new FormControl('', Validators.required),
      phone: '',
      fax: '',
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postCode: new FormControl('', Validators.required)
    });
  }

  public saveClose() {
    this.isSubmited = true;
    if (this.fg.invalid) {
      return;
    }

    let company = {
      companyName: this.fg.value['companyName'],
      taxCode: this.fg.value['taxCode'],
      phone: this.fg.value['phone'],
      fax: this.fg.value['fax']
    };

    // Update company
    this.companyService.addCompany(company).subscribe(data => {
      if (data) {

        // Update location
        let countryName = '',
          stateName = '',
          cityName = '';
        _.each(this.countries, data => { if (data.code === this.selectedCountry) { countryName = data.name; } });
        _.each(this.states, data => { if (data.code === this.selectedState) { stateName = data.name; } });
        _.each(this.cities, data => { if (data.code === this.selectedCity) { cityName = data.name; } });

        let location = {
          countryCode: this.selectedCountry,
          countryName: countryName,
          stateCode: this.selectedState,
          stateName: stateName,
          cityCode: this.selectedCity,
          cityName: cityName,
          address: this.fg.value['address'],
          postCode: this.fg.value['postCode'],
          company: data.id
        };

        this.companyService.updateLocation(location).subscribe(data => {
        },
          err => {
            this.toastr.warning('Save location failed!', 'Alert!');
            return;
          })
        this.modalService.setDismissReason('Yes');
        this.bsModalRef.hide();
      }
      else {
        this.toastr.warning('Save Company failed!', 'Alert!');
      }
    },
      err => {
        this.toastr.warning(err, 'Alert!');
      });
  }

  public countries: any;
  public states: any;
  public cities: any;
  public selectedCountry: string;
  public selectedState: string;
  public selectedCity: string;


  countryOnChange(value) {
    this.getStates(value);
  }

  stateOnChange(value) {
    this.getCities(value);
  }

  getCountries() {
    this.companyService.getCountries().subscribe(
      result => {
        if (result.length) {
          this.countries = result;   
          this.selectedCountry = 'MY';       
        }
        else {
          this.selectedCountry = '';
          this.selectedState = '';
          this.selectedCity = '';
        }
      },
      err => {
        console.log(err);
      });
  }

  getStates(countryCode) {
    if (!countryCode) {
      return;
    }
    this.companyService.getStates(countryCode).subscribe(
      result => {
        if (result.length) {
          this.states = result;
          this.selectedState = result[0].code;
        }
        else {
          this.selectedState = '';
          this.selectedCity = '';
          this.states = [{ code: '', name: '' }];
          this.cities = [{ code: '', name: '' }];
        }
      },
      err => {
        console.log(err);
      });
  }

  getCities(stateCode) {
    if (!stateCode) {
      return;
    }
    this.companyService.getCities(stateCode).subscribe(
      result => {
        if (result.length) {
          this.cities = result;
          this.selectedCity = result[0].code;
        }
        else {
          this.selectedCity = '';
          this.cities = [{ code: '', name: '' }];
        }
      },
      err => {
        console.log(err);
      });
  }
}