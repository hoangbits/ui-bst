import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ToastrService} from 'ngx-toastr';

import {Company, Location} from './index';
import {CompanyService} from './company.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MdDialog} from '@angular/material';
import {AlertDialog} from '../dialog/alert.dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'company-modal-content',
  templateUrl: './company.modal.edit.html',
  styleUrls: ['./company.modal.edit.css'],
  providers: [CompanyService]
})
export class CompanyModalEditComponent implements OnInit{
  title: string;
  company: Company;
  errorMsg: string;
  isSubmited: boolean;
  viewMode: boolean;
  fg: FormGroup;
  hdCompany: FormControl;
  locationCount: number;
  location: Location;
  locations: any[];
  locationSubmit: boolean = false;

  public countries: any;
  public states: any;
  public cities: any;
  public selectedCountry: string;
  public selectedState: string;
  public selectedCity: string;
  public postCode: string;
  public address: string;
  public locationName: string;
  public description: string;

  constructor(public bsModalRef: BsModalRef,
              private companyService: CompanyService,
              private fb: FormBuilder,
              private dialog: MdDialog,
              private modalService: BsModalService,
              private toastr: ToastrService){
    this.company = this.company || new Company();
    this.location = new Location();
    this.viewMode = this.viewMode || true;
    this.createForm();
    this.getCountries();
  }

  ngOnInit(){
    this.hdCompany = new FormControl();
    this.hdCompany.valueChanges.subscribe(() =>{
      if(this.company.id){
        this.getCompanyLocations(this.company.id);
      }
    });

  }

  createForm(){
    this.fg = this.fb.group({
      companyName: new FormControl('', Validators.required),
      taxCode: new FormControl('', Validators.required),
      phone: '',
      fax: ''
    });
  }

  public saveClose(){
    this.isSubmited = true;
    if(this.fg.invalid){
      return;
    }

    this.companyService.updateCompany(this.company).subscribe(data =>{
        if(data){
          this.modalService.setDismissReason('Yes');
          this.bsModalRef.hide();
        }
        else{
          this.toastr.warning('Update failed', 'Alert!');
        }
      },
      err =>{
        this.toastr.warning(err, 'Alert!');
      });
  }

  countryOnChange(value){
    this.getStates(value);
  }

  stateOnChange(value){
    this.getCities(value);
  }

  getCountries(){
    this.companyService.getCountries().subscribe(
      result =>{
        if(result.length){
          this.countries = result;
          this.selectedCountry = 'MY';
          this.getStates(this.selectedCountry);
        }
        else{
          this.selectedCountry = '';
          this.selectedState = '';
          this.selectedCity = '';
        }
      },
      err =>{
        console.log(err);
      });
  }

  getStates(countryCode){
    this.companyService.getStates(countryCode).subscribe(
      result =>{
        if(result.length){
          this.states = result;
          this.selectedState = result[0].code;
          this.getCities(this.selectedState);
        }
        else{
          this.selectedState = '';
          this.selectedCity = '';
          this.states = [{code: '', name: ''}];
          this.cities = [{code: '', name: ''}];
        }
      },
      err =>{
        console.log(err);
      });
  }

  getCities(stateCode){
    this.companyService.getCities(stateCode).subscribe(
      result =>{
        if(result.length){
          this.cities = result;
          this.selectedCity = result[0].code;
        }
        else{
          this.selectedCity = '';
          this.cities = [{code: '', name: ''}];
        }
      },
      err =>{
        console.log(err);
      });
  }

  addLocation(){
    this.locationSubmit = true;
    if(!this.selectedCountry
      || !this.selectedState
      || !this.selectedCity
      || !this.address
      || !this.postCode
      || !this.locationName){
      return false;
    }

    _.each(this.countries, data =>{
      if(data.code === this.selectedCountry){
        this.location.countryName = data.name;
      }
    });
    _.each(this.states, data =>{
      if(data.code === this.selectedState){
        this.location.stateName = data.name;
      }
    });
    _.each(this.cities, data =>{
      if(data.code === this.selectedCity){
        this.location.cityName = data.name;
      }
    });


    this.location.locationName = this.locationName;
    this.location.description = this.description;
    this.location.address = this.address;
    this.location.countryCode = this.selectedCountry;
    this.location.stateCode = this.selectedState;
    this.location.cityCode = this.selectedCity;
    this.location.postCode = this.postCode;
    this.location.company = this.company.id

    let dupl = _.find(this.locations, this.location);

    if(dupl){
      this.toastr.warning('This location is exiting!', 'Alert!');
      return false;
    }

    this.companyService.updateLocation(this.location).subscribe(() =>{
        this.locationSubmit = false;
        this.getCompanyLocations(this.company.id);
        this.toastr.success('A new location is added successfully!','Success!');
      },
      err =>{
        this.toastr.warning('Save location failed!', 'Alert!');
      }
    )
  }

  getCompanyLocations(companyId){
    this.companyService.getCompanyLocations(companyId).subscribe(data =>{
      this.locations = data;
      this.locationCount = data.length;
    })
  }

  removeLocation(id){
    this.companyService.removeCompanyLocation(id).subscribe(() =>{
        this.getCompanyLocations(this.company.id);
        this.toastr.success('Delete Location successfully!', 'Success!');
      },
      err =>{
        this.toastr.warning('Delete location failed!', 'Alert!');
      })
  }

  public confirmDialog(id){
    this.dialog.open(AlertDialog, {
      width: '400px', height: '170px', data: {
        title: 'Confirm dialog', message: 'Are you sure you want to delete this item?'
      }
    }).afterClosed().subscribe(result =>{
      if(result === 'OK'){
        this.removeLocation(id);
      }
    });
  }

}