import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  UserTextSearchEmailComponent
} from '../../common/component/user-text-search-email/user-text-search-email.component';
import {
  UserSelectSearchRoleComponent
} from '../../common/component/user-select-search-role/user-select-search-role.component';
import {
  UserSelectSearchUserTypeComponent
} from '../../common/component/user-select-search-user-type/user-select-search-user-type.component';
import {EqualValidatorDirective} from '../../common/directive/equal-validator.directive';
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [UserTextSearchEmailComponent,
    EqualValidatorDirective,
    UserSelectSearchUserTypeComponent,
    UserSelectSearchRoleComponent

  ],
  declarations: [UserTextSearchEmailComponent,
    EqualValidatorDirective,
    UserSelectSearchUserTypeComponent,
    UserSelectSearchRoleComponent
  ]
})
export class UserShareModule {
}
