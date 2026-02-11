import { Component } from '@angular/core';

interface SubNavItem {
  label: string;
  icon: string;
  id: string;
  route?: string;
}

interface NavItem {
  label: string;
  icon: string;
  id: string;
  route?: string;
  children?: SubNavItem[];
}

interface EnvItem {
  id: string;
  label: string;
  class: string;
}

// Mappings identiques à l'application originale
const MAPPING_TYPE: Record<string, { icon: string; title: string }> = {
  request: { icon: 'call_made', title: 'Intéractions' },
  rest: { icon: 'call_received', title: 'Services exposés' },
  batch: { icon: 'manufacturing', title: 'Tâches planifiées' },
  test: { icon: 'rule', title: 'Validation & Tests' },
  startup: { icon: 'restart_alt', title: 'Initialisation' },
  view: { icon: 'ads_click', title: 'Parcours Clients' },
  actives_instances: { icon: 'deployed_code', title: 'Instances Actives' },
};

const REQUEST_TYPE: Record<string, { icon: string; title: string }> = {
  rest: { icon: 'public', title: 'HTTP' },
  jdbc: { icon: 'storage', title: 'BDD' },
  ftp: { icon: 'folder_open', title: 'FTP' },
  smtp: { icon: 'forward_to_inbox', title: 'SMTP' },
  ldap: { icon: 'supervisor_account', title: 'LDAP' },
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  currentNav: NavItem | null = null;
  currentSubNav: SubNavItem | null = null;
  currentEnv: EnvItem = { id: 'dev', label: 'dev', class: 'dev' };

  MAPPING_TYPE = MAPPING_TYPE;
  REQUEST_TYPE = REQUEST_TYPE;

  navItems: NavItem[] = [
    {
      label: MAPPING_TYPE['request'].title,
      icon: MAPPING_TYPE['request'].icon,
      id: 'request',
      children: [
        {
          label: REQUEST_TYPE['rest'].title,
          icon: REQUEST_TYPE['rest'].icon,
          id: 'rest',
          route: 'request/rest',
        },
        {
          label: REQUEST_TYPE['jdbc'].title,
          icon: REQUEST_TYPE['jdbc'].icon,
          id: 'jdbc',
          route: 'request/jdbc',
        },
        {
          label: REQUEST_TYPE['ftp'].title,
          icon: REQUEST_TYPE['ftp'].icon,
          id: 'ftp',
          route: 'request/ftp',
        },
        {
          label: REQUEST_TYPE['smtp'].title,
          icon: REQUEST_TYPE['smtp'].icon,
          id: 'smtp',
          route: 'request/smtp',
        },
        {
          label: REQUEST_TYPE['ldap'].title,
          icon: REQUEST_TYPE['ldap'].icon,
          id: 'ldap',
          route: 'request/ldap',
        },
      ],
    },
    {
      label: MAPPING_TYPE['rest'].title,
      icon: MAPPING_TYPE['rest'].icon,
      id: 'rest',
      route: 'session/rest',
    },
    {
      label: MAPPING_TYPE['batch'].title,
      icon: MAPPING_TYPE['batch'].icon,
      id: 'batch',
      route: 'session/batch',
    },
    {
      label: MAPPING_TYPE['test'].title,
      icon: MAPPING_TYPE['test'].icon,
      id: 'test',
      route: 'session/test',
    },
    {
      label: MAPPING_TYPE['startup'].title,
      icon: MAPPING_TYPE['startup'].icon,
      id: 'startup',
      route: 'session/startup',
    },
    {
      label: MAPPING_TYPE['view'].title,
      icon: MAPPING_TYPE['view'].icon,
      id: 'view',
      route: 'session/view',
    },
  ];

  envItems: EnvItem[] = [
    { id: 'dev', label: 'dev', class: 'dev' },
    { id: 'ppd', label: 'ppd', class: 'ppd' },
    { id: 'prv', label: 'prv', class: 'prv' },
    { id: 'rec', label: 'rec', class: 'rec' },
  ];

  selectNav(item: NavItem) {
    this.currentNav = item;
    this.currentSubNav = null;
  }

  selectSubNav(item: NavItem, subItem: SubNavItem) {
    this.currentNav = item;
    this.currentSubNav = subItem;
  }

  selectEnv(item: EnvItem) {
    this.currentEnv = item;
  }

  getEnvDescription(envId: string): string {
    const descriptions: Record<string, string> = {
      dev: 'Développement',
      ppd: 'Pré-production',
      prv: 'Preview',
      rec: 'Recette',
    };
    return descriptions[envId] || '';
  }

  gotoHome() {
    this.currentNav = null;
    this.currentSubNav = null;
    console.log('Go to home');
  }
}
